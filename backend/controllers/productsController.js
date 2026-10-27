const pool = require("../models/db");
const {
  addProduct,
  addProductColor,
  addProductImages,
  getAllProducts,
  getProductById,
} = require("../models/productModel");

const createProduct = async (req, res) => {
  const { name, size, category_id, material_id, collection_id, finishing_id, shape_id, frame_type_id, colors } = req.body;

  if (!name || !size || !category_id || !material_id || !collection_id || !finishing_id || !shape_id || !frame_type_id || !Array.isArray(colors)) {
    return res.status(400).json({
      error: "All fields (name, size, category_id, material_id, collection_id, finishing_id, shape_id, frame_type_id, colors) are required",
    });
  }

  try {
    const product = await addProduct(name, size, category_id, material_id, collection_id, finishing_id, shape_id, frame_type_id);

    for (const color of colors) {
      const { color_name, color_code, images } = color;
      const { product_color_id } = await addProductColor(product.product_id, color_name, color_code);
      if (images && Array.isArray(images)) {
        await addProductImages(product_color_id, images);
      }
    }

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error.message);
    res.status(500).json({ error: "Error adding product", details: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { product_id, name, size, category_id, material_id, collection_id, finishing_id, shape_id, frame_type_id, colors } = req.body;

  if (!product_id || !name || !size || !category_id || !material_id || !collection_id || !finishing_id || !shape_id || !frame_type_id || !Array.isArray(colors)) {
    return res.status(400).json({
      error: "Invalid product data. Ensure all required fields are provided",
    });
  }

  try {
    await pool.query(
      `UPDATE products 
       SET name = ?, size = ?, category_id = ?, material_id = ?, collection_id = ?, finishing_id = ?, shape_id = ?, frame_type_id = ?, updated_at = NOW() 
       WHERE product_id = ?`,
      [name, size, category_id, material_id, collection_id, finishing_id, shape_id, frame_type_id, product_id]
    );

    const [existingColors] = await pool.query(
      `SELECT product_color_id FROM product_colors WHERE product_id = ?`,
      [product_id]
    );

    for (const color of existingColors) {
      await pool.query(
        `DELETE FROM product_images WHERE product_color_id = ?`,
        [color.product_color_id]
      );
    }

    await pool.query(`DELETE FROM product_colors WHERE product_id = ?`, [product_id]);

    for (const color of colors) {
      const { color_name, color_code, images } = color;
      const { product_color_id } = await addProductColor(product_id, color_name, color_code);
      if (images && Array.isArray(images)) {
        await addProductImages(product_color_id, images);
      }
    }

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ error: "Error updating product", details: error.message });
  }
};

const fetchAllProducts = async (req, res) => {
  console.log("fetchAllProducts controller invoked");
  try {
    

    const products = await getAllProducts();
   
    return res.status(200).json({ items: products});

    // fallback for older callers: return array directly    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).json({ error: "Error fetching products", details: error.message });
  }
};


const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const [productColors] = await pool.query(
      `SELECT product_color_id FROM product_colors WHERE product_id = ?`,
      [productId]
    );

    for (const color of productColors) {
      await pool.query(
        `DELETE FROM product_images WHERE product_color_id = ?`,
        [color.product_color_id]
      );
    }

    await pool.query(`DELETE FROM product_colors WHERE product_id = ?`, [productId]);
    await pool.query(`DELETE FROM products WHERE product_id = ?`, [productId]);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ error: "Error deleting product", details: error.message });
  }
};

const getProductDetails = async (req, res) => {
  const { productId } = req.params;

  if (!productId || isNaN(Number(productId))) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const product = await getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error.message);
    res.status(500).json({ error: "Error fetching product", details: error.message });
  }
};

module.exports = {
  createProduct,
  fetchAllProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
};