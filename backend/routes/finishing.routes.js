const express = require("express");
const {
  createfinishing,
  getAllfinishings,
  getfinishingId,
  updatefinishingDetails,
  deletefinishingDetails,
} = require("../controllers/finishingController");

const router = express.Router();

router.post("/", createfinishing);

router.get("/", getAllfinishings); // Get all materials
router.get("/:id", getfinishingId); // Get a specific material by ID
router.put("/:id", updatefinishingDetails); // Update a material
router.delete("/:id", deletefinishingDetails); // Delete a material

module.exports = router;
