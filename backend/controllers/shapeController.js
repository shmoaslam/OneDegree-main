const {
  addShape,
  getShapes,
  deleteShape,
  findShapeByName,
} = require("../models/shapeModel");

// Create a new shape
const createShape = async (req, res) => {
  const { shape_name, shape_img } = req.body;
  // Validate input
  if (
    !shape_name ||
    typeof shape_name !== "string" ||
    shape_name.trim() === ""
  ) {
    return res.status(400).json({
      error: "Shape name is required and must be a non-empty string",
    });
  }

  try {
    // Check if the shape already exists
    const existingShape = await findShapeByName(shape_name);
    if (existingShape) {
      return res.status(400).json({ error: "Shape already exists" });
    }

    // Add shape
    const shape = await addShape(shape_name, shape_img);
    res.status(201).json({ message: "Shape added successfully", shape });
  } catch (error) {
    console.error("Error adding shape:", error.message);
    res
      .status(500)
      .json({ error: "Error adding shape", details: error.message });
  }
};

// Get all shapes
const getAllShapes = async (req, res) => {
  try {
    // Fetch all shapes
    const shapes = await getShapes();
    res.status(200).json(shapes);
  } catch (error) {
    console.error("Error fetching shapes:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching shapes", details: error.message });
  }
};

// Delete a shape
const deleteShapeDetails = async (req, res) => {
  const { id } = req.params;

  // Validate input
  if (!id || isNaN(parseInt(id))) {
    return res
      .status(400)
      .json({ error: "Shape ID is required and must be a valid number" });
  }

  try {
    // Delete shape
    const deletedShape = await deleteShape(id);
    if (!deletedShape) {
      res.status(404).json({ error: "Shape not found" });
    } else {
      res.status(200).json({
        message: "Shape deleted successfully",
        deletedShape,
      });
    }
  } catch (error) {
    console.error("Error deleting shape:", error.message);
    res
      .status(500)
      .json({ error: "Error deleting shape", details: error.message });
  }
};

module.exports = {
  createShape,
  getAllShapes,
  deleteShapeDetails,
};
