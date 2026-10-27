const {
  addFinishing,
  getFInishing,
  getFinishingById,
  updatefinishing,
  deletefinishing,
  findfinishingByName,
} = require("../models/finishingModel");

// Create a new finishing
const createfinishing = async (req, res) => {
  const { finishing_name } = req.body;

  // Validate input
  if (
    !finishing_name ||
    typeof finishing_name !== "string" ||
    finishing_name.trim() === ""
  ) {
    return res.status(400).json({
      error: "finishing name is required and must be a non-empty string",
    });
  }

  try {
    // Check if the color name already exists
    const existingfinishing = await findfinishingByName(finishing_name);
    if (existingfinishing) {
      return res.status(400).json({ error: "finishing name already exists" });
    }

    // Add finishing
    const finishing = await addFinishing(finishing_name);
    res
      .status(201)
      .json({ message: "finishing added successfully", finishing });
  } catch (error) {
    console.error("Error adding finishing:", error.message);
    res
      .status(500)
      .json({ error: "Error adding finishing", details: error.message });
  }
};

// Get all finishings
const getAllfinishings = async (req, res) => {
  try {
    // Fetch all finishings
    const finishings = await getFInishing();
    res.status(200).json(finishings);
  } catch (error) {
    console.error("Error fetching finishings:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching finishings", details: error.message });
  }
};

// Get a specific finishing by ID
const getfinishingId = async (req, res) => {
  const { id } = req.params;

  // Validate input
  if (!id || isNaN(parseInt(id))) {
    return res
      .status(400)
      .json({ error: "finishing ID is required and must be a valid number" });
  }

  try {
    // Fetch finishing by ID
    const finishing = await getFinishingById(id);
    if (!finishing) {
      res.status(404).json({ error: "finishing not found" });
    } else {
      res
        .status(200)
        .json({ message: "finishing fetched successfully", finishing });
    }
  } catch (error) {
    console.error("Error fetching finishing:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching finishing", details: error.message });
  }
};

// Update a finishing
const updatefinishingDetails = async (req, res) => {
  const { id } = req.params;
  const { finishing_name } = req.body;

  // Validate input
  if (!id || isNaN(parseInt(id))) {
    return res
      .status(400)
      .json({ error: "finishing ID is required and must be a valid number" });
  }
  if (
    !finishing_name ||
    typeof finishing_name !== "string" ||
    finishing_name.trim() === ""
  ) {
    return res.status(400).json({
      error: "finishing name is required and must be a non-empty string",
    });
  }

  try {
    // Update finishing
    const updatedfinishing = await updatefinishing(id, finishing_name);
    if (!updatedfinishing) {
      res.status(404).json({ error: "finishing not found" });
    } else {
      res
        .status(200)
        .json({ message: "finishing updated successfully", updatedfinishing });
    }
  } catch (error) {
    console.error("Error updating finishing:", error.message);
    res
      .status(500)
      .json({ error: "Error updating finishing", details: error.message });
  }
};

// Delete a finishing
const deletefinishingDetails = async (req, res) => {
  const { id } = req.params;

  // Validate input
  if (!id || isNaN(parseInt(id))) {
    return res
      .status(400)
      .json({ error: "finishing ID is required and must be a valid number" });
  }

  try {
    // Delete finishing
    const deletedfinishing = await deletefinishing(id);
    if (!deletedfinishing) {
      res.status(404).json({ error: "finishing not found" });
    } else {
      res
        .status(200)
        .json({ message: "finishing deleted successfully", deletedfinishing });
    }
  } catch (error) {
    console.error("Error deleting finishing:", error.message);
    res
      .status(500)
      .json({ error: "Error deleting finishing", details: error.message });
  }
};

module.exports = {
  createfinishing,
  getAllfinishings,
  getfinishingId,
  updatefinishingDetails,
  deletefinishingDetails,
};
