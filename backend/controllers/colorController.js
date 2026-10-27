const {
  addColor,
  getColors,
  getColorById,
  findColorByName,
  deleteColor,
} = require("../models/colorModel");

// Create a new color
const createColor = async (req, res) => {
  const { color_name, color_code } = req.body;

  if (!color_name || !color_code) {
    return res
      .status(400)
      .json({ error: "Both color_name and color_code are required" });
  }

  try {
    // Check if the color name already exists
    const existingColor = await findColorByName(color_name);
    if (existingColor) {
      return res.status(400).json({ error: "Color name already exists" });
    }

    // Add the new color
    const color = await addColor(color_name, color_code);
    res.status(201).json({
      success: true,
      message: "Color added successfully",
      data: color,
    });
  } catch (error) {
    console.error("Error adding color:", error.message);
    res
      .status(500)
      .json({ error: "Error adding color", details: error.message });
  }
};

//  bulk upload

// Bulk Create Colors
const bulkCreateColors = async (req, res) => {
  const colors = req.body; // Expecting an array of objects

  if (!Array.isArray(colors) || colors.length === 0) {
    return res.status(400).json({ error: "Invalid or empty color array" });
  }

  try {
    const addedColors = [];
    for (const color of colors) {
      const { color_name, color_code } = color;

      if (!color_name || !color_code) {
        return res
          .status(400)
          .json({ error: "Each color must have color_name and color_code" });
      }

      // Check if color name already exists
      const existingColor = await findColorByName(color_name);
      if (!existingColor) {
        const newColor = await addColor(color_name, color_code);
        addedColors.push(newColor);
      }
    }

    res.status(201).json({
      success: true,
      message: "Colors added successfully",
      data: addedColors,
    });
  } catch (error) {
    console.error("Error adding colors:", error.message);
    res
      .status(500)
      .json({ error: "Error adding colors", details: error.message });
  }
};

// Get all colors
const getAllColors = async (req, res) => {
  try {
    const colors = await getColors();
    res.status(200).json(colors);
  } catch (error) {
    console.error("Error fetching colors:", error.message);
    res.status(500).json({ error: "Error fetching colors" });
  }
};

// Delete a color
const removeColor = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Color ID is required" });
  }

  try {
    await deleteColor(id);
    res.status(200).json({ message: "Color deleted successfully" });
  } catch (error) {
    console.error("Error deleting color:", error.message);
    res
      .status(500)
      .json({ error: "Error deleting color", details: error.message });
  }
};

module.exports = { createColor, getAllColors, removeColor, bulkCreateColors };
