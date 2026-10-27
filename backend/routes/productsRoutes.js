const express = require("express");
const {
  createProduct,
  fetchAllProducts,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productsController");

const router = express.Router();

router.get("/", fetchAllProducts); 

router.get(
  "/products/:productId",
  (req, res, next) => {
    // console.log("Route hit:", req.params.productId);
    next();
  },
  getProductDetails
);

router.post("/", createProduct); // Create a new product
router.put("/", updateProduct); // Update an existing product
router.delete("/:productId", deleteProduct); // Delete a product

module.exports = router;
