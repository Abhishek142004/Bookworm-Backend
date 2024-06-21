const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth-controller"); // Import controllers for authentication
const userSchema = require("../validators/auth-validator"); // Import validation schema for user input
const validate = require("../middleware/validate-middleware"); // Import middleware for validating user input
const authMiddleware = require("../middleware/auth-middleware");

// Route to handle the home endpoint
router.get("/", authControllers.home);

// Route to handle user registration
router.post("/register", validate(userSchema), authControllers.register);

// Route to handle user login
router.post("/login", authControllers.login);

router.get("/user", authMiddleware, authControllers.userLogic);

router.put("/update", authMiddleware, authControllers.updateUserBalance);

// router.post("/add-book", authControllers.addBook);

module.exports = router;
