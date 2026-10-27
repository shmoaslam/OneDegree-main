const pool = require("./db");

// Add a new finishing
const addFinishing = async (finishing_name) => {
  try {
    // Insert finishing into the database
    const query = `INSERT INTO finishing (finishing_name, created_at) VALUES (?, NOW())`;
    const [result] = await pool.query(query, [finishing_name]);

    // Fetch the inserted finishing using its ID
    const [rows] = await pool.query(
      "SELECT * FROM finishing WHERE finishing_id = ?",
      [result.insertId]
    );

    // console.log("Insert result:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Get all finishing
const getFInishing = async () => {
  try {
    const query = `SELECT * FROM finishing ORDER BY finishing_id ASC;`;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Get a specific finishing by ID
const getFinishingById = async (id) => {
  try {
    const query = `SELECT * FROM finishing WHERE finishing_id = ?;`;
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Update a finishing
const updatefinishing = async (id, finishing_name) => {
  try {
    const query = `
            UPDATE finishing
            SET finishing_name = ?, updated_at = NOW()
            WHERE finishing_id = ?;
        `;
    await pool.query(query, [finishing_name, id]);

    // Fetch the updated finishing
    const [rows] = await pool.query(
      "SELECT * FROM finishing WHERE finishing = ?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Delete a finishing
const deletefinishing = async (id) => {
  try {
    // Fetch the finishing before deletion
    const [rows] = await pool.query(
      "SELECT * FROM finishing WHERE finishing_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null; // finishing not found
    }

    // Delete the finishing
    const query = `DELETE FROM finishing WHERE finishing_id = ?;`;
    await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

//  find already exist or not
const findfinishingByName = async (finishing_name) => {
  const query = `SELECT * FROM finishing WHERE finishing_name = ?;`;
  const [rows] = await pool.query(query, [finishing_name]);
  return rows[0]; // Returns the first matching row or undefined
};

module.exports = {
  addFinishing,
  getFInishing,
  getFinishingById,
  updatefinishing,
  deletefinishing,
  findfinishingByName,
};
