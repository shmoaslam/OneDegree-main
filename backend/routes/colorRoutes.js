const express = require("express");
const {
  createColor,
  getAllColors,
  removeColor,
  bulkCreateColors,
} = require("../controllers/colorController");

const router = express.Router();

router.post("/", createColor);
router.post("/bulk", bulkCreateColors);
router.get("/", getAllColors);
router.delete("/:id", removeColor);

module.exports = router;
