const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cart-controller"); // Import cart controllers
const authMiddleware = require("../middleware/auth-middleware");

// Add item to cart
router.post("/add", authMiddleware, cartControllers.addItem);

// Remove item from cart
router.post("/remove", authMiddleware, cartControllers.removeItem);

// Get cart items
router.get("/get", authMiddleware, cartControllers.getCart);

module.exports = router;
