const express = require("express");
const { sendNewsletterEmail } = require("../controllers/FooterEmailController");

const router = express.Router();

router.post("/", sendNewsletterEmail);

module.exports = router;
