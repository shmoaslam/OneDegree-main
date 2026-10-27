const express = require("express");
const { sendWishlistEmail } = require("../controllers/emailController");

const router = express.Router();

router.post("/", sendWishlistEmail);

module.exports = router;
