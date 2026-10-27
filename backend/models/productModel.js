const pool = require("./db");

// NOTE: queries in this model join across several tables. For acceptable
// performance on large product catalogs you should have proper indexes in
// the database. At a minimum, make sure there are indexes on the following
// columns:
//   * products.category_id, products.material_id, products.collection_id,
//     products.finishing_id, products.shape_id, products.frame_type_id
//   * product_colors.product_id, product_colors.color_id
//   * product_images.product_color_id
// Adding these via a migration or directly in MySQL will drastically reduce
// the time spent scanning tables during the joins. You should also consider
// a compound index on (product_id, product_color_id) where appropriate.


// Add a new product
const addProduct = async (
  name,
  size,
  category_id,
  material_id,
  collection_id,
  finishing_id,
  shape_id,
  frame_type_id
) => {
  const query = `
        INSERT INTO products (name, size, category_id, material_id, collection_id, finishing_id, shape_id, frame_type_id, created_at) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW());
    `;
  const [result] = await pool.query(query, [
    name,
    size,
    category_id,
    material_id,
    collection_id,
    finishing_id,
    shape_id,
    frame_type_id,
  ]);
  const [rows] = await pool.query(
    `SELECT * FROM products WHERE product_id = ?`,
    [result.insertId]
  );
  return rows[0];
};

// Add a product color
const addProductColor = async (product_id, color_name, color_code) => {
  let [existingColor] = await pool.query(
    `SELECT * FROM colors WHERE color_name = ? AND color_code = ?`,
    [color_name, color_code]
  );
  let color_id;
  if (existingColor.length > 0) {
    color_id = existingColor[0].color_id;
  } else {
    const [colorResult] = await pool.query(
      `INSERT INTO colors (color_name, color_code, created_at) VALUES (?, ?, NOW())`,
      [color_name, color_code]
    );
    color_id = colorResult.insertId;
  }

  const [productColorResult] = await pool.query(
    `INSERT INTO product_colors (product_id, color_id, created_at) VALUES (?, ?, NOW())`,
    [product_id, color_id]
  );

  return { product_color_id: productColorResult.insertId, color_id };
};

// Add images for a product color
const addProductImages = async (product_color_id, images) => {
  for (const [index, image] of images.entries()) {
    await pool.query(
      `INSERT INTO product_images (product_color_id, image_url, image_order, created_at) 
             VALUES (?, ?, ?, NOW())`,
      [product_color_id, image.url, index + 1]
    );
  }
};

// options is an object that may include pagination values { page, limit }.
// Defaults return all products when options are omitted, but for large datasets
// clients should supply a page/limit to avoid retrieving every row.
const getAllProducts = async () => {


  let productQuery = `
      SELECT 
          p.product_id, 
          p.name AS product_name, 
          p.size,
          c.category_name, 
          m.material_name, 
          m.material_id, 
          c.category_id,
          col.collection_id,
          col.collection_name,
          f.finishing_name,
          f.finishing_id,
          s.shape_name,
          s.shape_id,
          ft.frame_type_name,
          ft.frame_type_id
      FROM products p
      JOIN categories c ON p.category_id = c.category_id
      JOIN materials m ON p.material_id = m.material_id
      JOIN collection col ON p.collection_id = col.collection_id
      JOIN finishing f ON p.finishing_id = f.finishing_id
      JOIN shape s ON p.shape_id = s.shape_id
      JOIN frame_type ft ON p.frame_type_id = ft.frame_type_id
      ORDER BY p.name
  `;


  const [productsResult] = await pool.query(productQuery);
  const productList = productsResult;

  // If there are no products on this page, return empty array early
  if (productList.length === 0) {
    return [];
  }

  // Build id lists for the subsequent queries so we only fetch related colors/images
  const productIds = productList.map(p => p.product_id);

  // Fetch colors for the products on the current page
  const [colorsResult] = await pool.query(
    `SELECT 
        pc.product_id, 
        pc.product_color_id, 
        co.color_name, 
        co.color_code
      FROM product_colors pc
      JOIN colors co ON pc.color_id = co.color_id
      WHERE pc.product_id IN (?);
    `,
    [productIds]
  );
  const colorList = colorsResult;

  // Prepare list of color IDs to fetch images
  const colorIds = colorList.map(c => c.product_color_id);
  let imageList = [];
  if (colorIds.length > 0) {
    const [imagesResult] = await pool.query(
      `SELECT 
          pi.product_color_id, 
          pi.image_id, 
          pi.image_url, 
          pi.image_order
        FROM product_images pi
        WHERE pi.product_color_id IN (? )
        ORDER BY pi.image_order;
      `,
      [colorIds]
    );
    imageList = imagesResult;
  }

  // Create maps and assemble the final result like before
  const colorMap = new Map();
  for (const color of colorList) {
    if (!colorMap.has(color.product_id)) {
      colorMap.set(color.product_id, []);
    }
    colorMap.get(color.product_id).push({
      product_color_id: color.product_color_id,
      color_name: color.color_name,
      color_code: color.color_code,
      images: []
    });
  }

  const imageMap = new Map();
  for (const image of imageList) {
    if (!imageMap.has(image.product_color_id)) {
      imageMap.set(image.product_color_id, []);
    }
    imageMap.get(image.product_color_id).push({
      image_id: image.image_id,
      image_url: image.image_url,
      image_order: image.image_order
    });
  }

  for (const [productId, productColors] of colorMap) {
    for (const color of productColors) {
      color.images = imageMap.get(color.product_color_id) || [];
    }
  }

  return productList.map(product => ({
    ...product,
    colors: colorMap.get(product.product_id) || []
  }));
};




// Get product by ID
const getProductById = async (product_id) => {
  const [product] = await pool.query(
    `SELECT 
            p.product_id, 
            p.name AS product_name, 
            p.size , 
            c.category_name, 
            m.material_name, 
             m.material_id, 
            c.category_id,
            col.collection_id,
            col.collection_name,
            f.finishing_name,
             f.finishing_id,
            s.shape_name,
            s.shape_id,
            ft.frame_type_name,
           ft.frame_type_id
         FROM products p
         JOIN categories c ON p.category_id = c.category_id
         JOIN materials m ON p.material_id = m.material_id
         JOIN collection col ON p.collection_id = col.collection_id
         JOIN finishing f ON p.finishing_id = f.finishing_id
         JOIN shape s ON p.shape_id = s.shape_id
         JOIN frame_type ft ON p.frame_type_id = ft.frame_type_id
         WHERE p.product_id = ?`,
    [product_id]
  );

  if (product.length === 0) return null;

  const [colors] = await pool.query(
    `SELECT 
            pc.product_color_id, 
            co.color_name, 
            co.color_code 
         FROM product_colors pc
         JOIN colors co ON pc.color_id = co.color_id
         WHERE pc.product_id = ?`,
    [product_id]
  );

  for (const color of colors) {
    const [images] = await pool.query(
      `SELECT 
                image_id, 
                image_url, 
                image_order 
             FROM product_images 
             WHERE product_color_id = ? 
             ORDER BY image_order`,
      [color.product_color_id]
    );
    color.images = images;
  }

  product[0].colors = colors;

  return product[0];
};

module.exports = {
  addProduct,
  addProductColor,
  addProductImages,
  getAllProducts,
  getProductById,
};
