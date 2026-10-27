const pool = require("./db");

// Add a new frame type
const addFrameType = async (frame_type_name, frame_type_img) => {
  try {
    const query = `INSERT INTO frame_type (frame_type_name, frame_type_img, created_at) VALUES (?, ?, NOW())`;
    const [result] = await pool.query(query, [frame_type_name, frame_type_img]);

    const [rows] = await pool.query("SELECT * FROM frame_type WHERE frame_type_id = ?", [result.insertId]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Get all frame types
const getFrameTypes = async () => {
  try {
    const query = `SELECT * FROM frame_type ORDER BY frame_type_id ASC;`;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Delete a frame type
const deleteFrameType = async (frame_type_id) => {
  try {
    const [rows] = await pool.query("SELECT * FROM frame_type WHERE frame_type_id = ?", [frame_type_id]);

    if (rows.length === 0) return null;

    const query = `DELETE FROM frame_type WHERE frame_type_id = ?;`;
    await pool.query(query, [frame_type_id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Find frame type by name
const findFrameTypeByName = async (frame_type_name) => {
  const query = `SELECT * FROM frame_type WHERE frame_type_name = ?;`;
  const [rows] = await pool.query(query, [frame_type_name]);
  return rows[0];
};

module.exports = {
  addFrameType,
  getFrameTypes,
  deleteFrameType,
  findFrameTypeByName,
};
