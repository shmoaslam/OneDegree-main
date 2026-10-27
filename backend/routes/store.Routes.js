const express = require("express");
const {
  createStore,
  getAllStoresController,
  getStoreByIdController,
  updateStoreById,
  deleteStoreById,
  createStoresMany,
} = require("../controllers/storeController");

const router = express.Router();

router.post("/", createStore);
router.post("/bulk/store", createStoresMany);

router.get("/", getAllStoresController); // Get all materials
router.get("/:id", getStoreByIdController); // Get a specific material by ID
router.put("/:id", updateStoreById); // Update a material
router.delete("/:id", deleteStoreById); // Delete a material

module.exports = router;
