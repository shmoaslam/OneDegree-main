const pool = require("./db");

// Add a new shape
const addShape = async (shape_name, shape_img) => {
  try {
    const query = `INSERT INTO shape (shape_name, shape_img, created_at) VALUES (?, ?, NOW())`;
    const [result] = await pool.query(query, [shape_name, shape_img]);

    const [rows] = await pool.query("SELECT * FROM shape WHERE shape_id = ?", [result.insertId]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Get all shapes
const getShapes = async () => {
  try {
    const query = `SELECT * FROM shape ORDER BY shape_id ASC;`;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Delete a shape
const deleteShape = async (shape_id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM shape WHERE shape_id = ?", [shape_id]);

    if (rows.length === 0) return null;

    const query = `DELETE FROM shape WHERE shape_id = ?;`;
    await pool.query(query, [shape_id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Find shape by name
const findShapeByName = async (shape_name) => {
  const query = `SELECT * FROM shape WHERE shape_name = ?;`;
  const [rows] = await pool.query(query, [shape_name]);
  return rows[0];
};

module.exports = {
  addShape,
  getShapes,
  deleteShape,
  findShapeByName,
};
