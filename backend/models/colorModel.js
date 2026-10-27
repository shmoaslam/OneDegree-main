const pool = require("./db");

// Add a new color
const addColor = async (color_name, color_code) => {
  const query = `
        INSERT INTO colors (color_name, color_code, created_at) 
        VALUES (?, ?, NOW());
    `;
  const [result] = await pool.query(query, [color_name, color_code]);
  const [rows] = await pool.query(`SELECT * FROM colors WHERE color_id = ?`, [
    result.insertId,
  ]);
  return rows[0];
};

// Add multiple colors (bulk upload)
const addColorsBulk = async (colors) => {
  if (!Array.isArray(colors) || colors.length === 0) {
    throw new Error("Invalid colors array");
  }

  const values = colors.map(({ color_name, color_code }) => [color_name, color_code]);
  const query = `INSERT INTO colors (color_name, color_code, created_at) VALUES ?`;

  await pool.query(query, [values.map(val => [...val, new Date()])]);
};

// Get all colors
const getColors = async () => {
  const query = `SELECT * FROM colors ORDER BY color_id ASC;`;
  const [rows] = await pool.query(query);
  return rows;
};

// Get a specific color by ID
const getColorById = async (id) => {
  const query = `SELECT * FROM colors WHERE color_id = ?;`;
  const [rows] = await pool.query(query, [id]);
  return rows[0];
};

// Delete a color
const deleteColor = async (id) => {
  const query = `DELETE FROM colors WHERE color_id = ?;`;
  await pool.query(query, [id]);
};

// Check if a color name already exists
const findColorByName = async (color_name) => {
  const query = `SELECT * FROM colors WHERE color_name = ?;`;
  const [rows] = await pool.query(query, [color_name]);
  return rows[0]; // Returns the first matching row or undefined
};

module.exports = {
  addColor,
  addColorsBulk,
  getColors,
  getColorById,
  deleteColor,
  findColorByName,
};
