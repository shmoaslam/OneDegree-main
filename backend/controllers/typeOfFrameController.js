const {
  addFrameType,
  getFrameTypes,
  deleteFrameType,
  findFrameTypeByName,
} = require("../models/typeOfFrameModel");

// Create a new frame type
const createFrameType = async (req, res) => {
  const { frame_type_name, frame_type_img } = req.body;
  // Validate input
  if (
    !frame_type_name ||
    typeof frame_type_name !== "string" ||
    frame_type_name.trim() === ""
  ) {
    return res.status(400).json({
      error: "Frame type name is required and must be a non-empty string",
    });
  }

  try {
    // Check if the frame type already exists
    const existingFrameType = await findFrameTypeByName(frame_type_name);
    if (existingFrameType) {
      return res.status(400).json({ error: "Frame type already exists" });
    }

    // Add frame type
    const frameType = await addFrameType(frame_type_name, frame_type_img);
    res
      .status(201)
      .json({ message: "Frame type added successfully", frameType });
  } catch (error) {
    console.error("Error adding frame type:", error.message);
    res
      .status(500)
      .json({ error: "Error adding frame type", details: error.message });
  }
};

// Get all frame types
const getAllFrameTypes = async (req, res) => {
  try {
    // Fetch all frame types
    const frameTypes = await getFrameTypes();
    res.status(200).json(frameTypes);
  } catch (error) {
    console.error("Error fetching frame types:", error.message);
    res
      .status(500)
      .json({ error: "Error fetching frame types", details: error.message });
  }
};

// Get a specific frame type by ID
// const getFrameTypeByIdController = async (req, res) => {
//   const { id } = req.params;

//   // Validate input
//   if (!id || isNaN(parseInt(id))) {
//     return res
//       .status(400)
//       .json({ error: "Frame type ID is required and must be a valid number" });
//   }

//   try {
//     // Fetch frame type by ID
//     const frameType = await getFrameTypeById(id);
//     if (!frameType) {
//       res.status(404).json({ error: "Frame type not found" });
//     } else {
//       res
//         .status(200)
//         .json({ message: "Frame type fetched successfully", frameType });
//     }
//   } catch (error) {
//     console.error("Error fetching frame type:", error.message);
//     res
//       .status(500)
//       .json({ error: "Error fetching frame type", details: error.message });
//   }
// };

// Delete a frame type
const deleteFrameTypeDetails = async (req, res) => {
  const { id } = req.params;

  // Validate input
  if (!id || isNaN(parseInt(id))) {
    return res
      .status(400)
      .json({ error: "Frame type ID is required and must be a valid number" });
  }

  try {
    // Delete frame type
    const deletedFrameType = await deleteFrameType(id);
    if (!deletedFrameType) {
      res.status(404).json({ error: "Frame type not found" });
    } else {
      res.status(200).json({
        message: "Frame type deleted successfully",
        deletedFrameType,
      });
    }
  } catch (error) {
    console.error("Error deleting frame type:", error.message);
    res
      .status(500)
      .json({ error: "Error deleting frame type", details: error.message });
  }
};

module.exports = {
  createFrameType,
  getAllFrameTypes,
  deleteFrameTypeDetails,
};
