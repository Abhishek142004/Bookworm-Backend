const express = require("express");
const router = express.Router();
const { feedback } = require("../controllers/contact-controller"); // Import feedback controller function
const validate = require("../middleware/validate-middleware"); // Import validation middleware
const contactSchema = require("../validators/contact-validator"); // Import contact validation schema

// Route to handle feedback submission
router.post("/", validate(contactSchema), feedback);

module.exports = router;
