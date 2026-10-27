const {
  addMaterial,
  getMaterials,
  getMaterialById,
  updateMaterial,
  deleteMaterial,
  findMaterialByName,
} = require("../models/materialModel");

// Create a new material
const createMaterial = async (req, res) => {
  const { name } = req.body;

  // Validate input
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Material name is required and must be a non-empty string",
    });
  }

  try {
    // Check if the color name already exists
    const existingMaterial = await findMaterialByName(name);
    if (existingMaterial) {
      return res.status(400).json({ error: "Material name already exists" });
    }

    // Add material
    const material = await addMaterial(name);
    res.status(201).json({ message: "Material added successfully", material });
  } catch (error) {
    console.error("Error adding material:", error.message);
    res
      .status(500)
      .json({ error: "Error adding material", details: error.message });
  }
};

// Get all materials
const getAllMaterials = async (req, res) => {
  try {
    // Fetch all materials
    const materials = await getMaterials();
    res
      .status(200)
      .json({ message: "Materials fetched successfully", materials });
  } catch (error) {
    console.error("Error fetching materials:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching materials", details: error.message });
  }
};

// Get a specific material by ID
const getMaterial = async (req, res) => {
  const { id } = req.params;

  // Validate input
  if (!id || isNaN(parseInt(id))) {
    return res
      .status(400)
      .json({ error: "Material ID is required and must be a valid number" });
  }

  try {
    // Fetch material by ID
    const material = await getMaterialById(id);
    if (!material) {
      res.status(404).json({ error: "Material not found" });
    } else {
      res
        .status(200)
        .json({ message: "Material fetched successfully", material });
    }
  } catch (error) {
    console.error("Error fetching material:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching material", details: error.message });
  }
};

// Update a material
const updateMaterialDetails = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Validate input
  if (!id || isNaN(parseInt(id))) {
    return res
      .status(400)
      .json({ error: "Material ID is required and must be a valid number" });
  }
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Material name is required and must be a non-empty string",
    });
  }

  try {
    // Update material
    const updatedMaterial = await updateMaterial(id, name);
    if (!updatedMaterial) {
      res.status(404).json({ error: "Material not found" });
    } else {
      res
        .status(200)
        .json({ message: "Material updated successfully", updatedMaterial });
    }
  } catch (error) {
    console.error("Error updating material:", error.message);
    res
      .status(500)
      .json({ error: "Error updating material", details: error.message });
  }
};

// Delete a material
const deleteMaterialDetails = async (req, res) => {
  const { id } = req.params;

  // Validate input
  if (!id || isNaN(parseInt(id))) {
    return res
      .status(400)
      .json({ error: "Material ID is required and must be a valid number" });
  }

  try {
    // Delete material
    const deletedMaterial = await deleteMaterial(id);
    if (!deletedMaterial) {
      res.status(404).json({ error: "Material not found" });
    } else {
      res
        .status(200)
        .json({ message: "Material deleted successfully", deletedMaterial });
    }
  } catch (error) {
    console.error("Error deleting material:", error.message);
    res
      .status(500)
      .json({ error: "Error deleting material", details: error.message });
  }
};

module.exports = {
  createMaterial,
  getAllMaterials,
  getMaterial,
  updateMaterialDetails,
  deleteMaterialDetails,
};
