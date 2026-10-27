const express = require("express");
const {
  createCollection,
  getAllCollection,
  getCollectionById,
  updateCollectionById,
  deleteCollection,
} = require("../controllers/collectionController");

const router = express.Router();

router.post("/", createCollection);

router.get("/", getAllCollection); // Get all materials
router.get("/:id", getCollectionById); // Get a specific material by ID
router.put("/:id", updateCollectionById); // Update a material
router.delete("/:id", deleteCollection); // Delete a material

module.exports = router;
