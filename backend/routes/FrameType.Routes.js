const express = require("express");
const {
  createFrameType,
  getAllFrameTypes,
  deleteFrameTypeDetails,
} = require("../controllers/typeOfFrameController");

const router = express.Router();

router.post("/", createFrameType);

router.get("/", getAllFrameTypes); // Get all materials
router.delete("/:id", deleteFrameTypeDetails); // Delete a material

module.exports = router;
