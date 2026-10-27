const pool = require("./db");

// Add a new collection
const addCollection = async (collection_name, collection_desc, collection_image) => {
  try {
    const query = `INSERT INTO collection (collection_name, collection_desc, collection_image, created_at) 
                   VALUES (?, ?, ?, NOW())`;
    const [result] = await pool.query(query, [collection_name, collection_desc, collection_image]);

    const [rows] = await pool.query(
      "SELECT * FROM collection WHERE collection_id = ?",
      [result.insertId]
    );
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Get all collections
const getCollection = async () => {
  try {
    const query = `SELECT * FROM collection ORDER BY collection_id ASC;`;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Get a specific collection by ID
const getCollectionsById = async (id) => {
  try {
    const query = `SELECT * FROM collection WHERE collection_id = ?;`;
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Update a collection
const updateCollection = async (id, collection_name, collection_desc, collection_image) => {
  try {
    const query = `
      UPDATE collection
      SET collection_name = ?, collection_desc = ?, collection_image = ?, updated_at = NOW()
      WHERE collection_id = ?;
    `;
    await pool.query(query, [collection_name, collection_desc, collection_image, id]);

    const [rows] = await pool.query(
      "SELECT * FROM collection WHERE collection_id = ?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Delete a collection
const deleteCollections = async (id) => {
  try {
    const query = `DELETE FROM collection WHERE collection_id = ?;`;
    const [rows] = await pool.query(
      "SELECT * FROM collection WHERE collection_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null; // Collection not found
    }

    await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

const findCollectionByName = async (collection_name) => {
  const query = `SELECT * FROM collection WHERE collection_name = ?;`;
  const [rows] = await pool.query(query, [collection_name]);
  return rows[0]; // Returns the first matching row or undefined
};

module.exports = {
  addCollection,
  getCollection,
  updateCollection,
  deleteCollections,
  findCollectionByName,
  getCollectionsById,
};
