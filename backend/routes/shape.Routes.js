const express = require("express");
const {
  createShape,
  getAllShapes,
  deleteShapeDetails,
} = require("../controllers/shapeController");

const router = express.Router();

router.post("/", createShape);

router.get("/", getAllShapes); // Get all materials
router.delete("/:id", deleteShapeDetails); // Delete a material

module.exports = router;
