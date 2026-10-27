const pool = require("./db");

// Add a new material
const addMaterial = async (material_name) => {
  try {
    // Insert material into the database
    const query = `INSERT INTO materials (material_name, created_at) VALUES (?, NOW())`;
    const [result] = await pool.query(query, [material_name]);

    // Fetch the inserted material using its ID
    const [rows] = await pool.query(
      "SELECT * FROM materials WHERE material_id = ?",
      [result.insertId]
    );

    console.log("Insert result:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error; // Rethrow the error to handle it in the calling function
  }
};

// Get all materials
const getMaterials = async () => {
  try {
    const query = `SELECT * FROM materials ORDER BY material_id ASC;`;
    const [rows] = await pool.query(query);
    return rows;
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Get a specific material by ID
const getMaterialById = async (id) => {
  try {
    const query = `SELECT * FROM materials WHERE material_id = ?;`;
    const [rows] = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Update a material
const updateMaterial = async (id, material_name) => {
  try {
    const query = `
            UPDATE materials
            SET material_name = ?, updated_at = NOW()
            WHERE material_id = ?;
        `;
    await pool.query(query, [material_name, id]);

    // Fetch the updated material
    const [rows] = await pool.query(
      "SELECT * FROM materials WHERE material_id = ?",
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

// Delete a material
const deleteMaterial = async (id) => {
  try {
    // Fetch the material before deletion
    const [rows] = await pool.query(
      "SELECT * FROM materials WHERE material_id = ?",
      [id]
    );

    if (rows.length === 0) {
      return null; // Material not found
    }

    // Delete the material
    const query = `DELETE FROM materials WHERE material_id = ?;`;
    await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error.message);
    throw error;
  }
};

//  find already exist or not
const findMaterialByName = async (material_name) => {
  const query = `SELECT * FROM materials WHERE material_name = ?;`;
  const [rows] = await pool.query(query, [material_name]);
  return rows[0]; // Returns the first matching row or undefined
};

module.exports = {
  addMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  findMaterialByName,
};
