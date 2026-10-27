const pool = require("./db");

// Add a new category
const addCategory = async (category_name) => {
  try {
    const query = `INSERT INTO categories (category_name, created_at) VALUES (?, NOW())`;
    const [result] = await pool.query(query, [category_name]);

    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [result.insertId]
    );
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Get all categories
const getCategories = async () => {
  try {
    const query = `SELECT * FROM categories ORDER BY category_id ASC;`;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Get a specific category by ID
const getCategoryById = async (id) => {
  try {
    const query = `SELECT * FROM categories WHERE category_id = ?;`;
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Update a category
const updateCategory = async (id, category_name) => {
  try {
    const query = `
            UPDATE categories
            SET category_name = ?, updated_at = NOW()
            WHERE category_id = ?;
        `;
    await pool.query(query, [category_name, id]);

    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Delete a category
const deleteCategory = async (id) => {
  try {
    const query = `DELETE FROM categories WHERE category_id = ?;`;
    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null; // Category not found
    }

    await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

const findCategoryByName = async (category_name) => {
  const query = `SELECT * FROM categories WHERE category_name = ?;`;
  const [rows] = await pool.query(query, [category_name]);
  return rows[0]; // Returns the first matching row or undefined
};
module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  findCategoryByName,
};
