const pool = require("./db");

// Add a new store
const addStore = async (store_name, store_address, locality, city, pincode) => {
  try {
    const query = `
      INSERT INTO Store_Locator (store_name, store_address, locality, city, pincode) 
      VALUES (?, ?, ?, ?, ?);
    `;
    const [result] = await pool.query(query, [store_name, store_address, locality, city, pincode]);

    const [rows] = await pool.query("SELECT * FROM Store_Locator WHERE store_id = ?", [result.insertId]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};


// Add multiple stores
const addStoresMany = async (stores) => {
  try {
    if (!Array.isArray(stores) || stores.length === 0) {
      throw new Error("Invalid or empty store data");
    }

    const values = stores.map(({ store_name, store_address, locality, city, pincode }) => 
      [store_name, store_address, locality, city, pincode]
    );

    const placeholders = stores.map(() => "(?, ?, ?, ?, ?)").join(", ");
    const query = `
      INSERT INTO Store_Locator (store_name, store_address, locality, city, pincode) 
      VALUES ${placeholders};
    `;

    const flattenedValues = values.flat();
    const [result] = await pool.query(query, flattenedValues);

    const [rows] = await pool.query("SELECT * FROM Store_Locator WHERE store_id >= ? LIMIT ?", [result.insertId, stores.length]);
    return rows;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};


// Get all stores
const getAllStores = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM Store_Locator ORDER BY store_id ASC;");
    return rows;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Get a store by ID
const getStoreById = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Store_Locator WHERE store_id = ?", [id]);
    return rows[0] || null;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Update a store
const updateStore = async (id, store_name, store_address, locality, city, pincode) => {
  try {
    const query = `
      UPDATE Store_Locator 
      SET store_name = ?, store_address = ?, locality = ?, city = ?, pincode = ? 
      WHERE store_id = ?;
    `;
    await pool.query(query, [store_name, store_address, locality, city, pincode, id]);

    const [rows] = await pool.query("SELECT * FROM Store_Locator WHERE store_id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Delete a store
const deleteStore = async (id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Store_Locator WHERE store_id = ?", [id]);
    if (rows.length === 0) {
      return null; // Store not found
    }
    await pool.query("DELETE FROM Store_Locator WHERE store_id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Find store by name
const findStoreByName = async (store_name) => {
  const [rows] = await pool.query("SELECT * FROM Store_Locator WHERE store_name = ?", [store_name]);
  return rows[0] || null;
};

module.exports = {
  addStore,
  getAllStores,
  getStoreById,
  updateStore,
  deleteStore,
  findStoreByName,
  addStoresMany
};
