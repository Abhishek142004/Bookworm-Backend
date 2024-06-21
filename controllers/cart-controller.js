const Cart = require("../Models/cart-model");
const authMiddleware = require("../middleware/auth-middleware");

// Add item to cart
const addItem = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate userId is present
    if (!userId) {
      return res.status(400).json({ msg: "userId is required" });
    }

    // Example: Create or update cart item
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = await Cart.create({ userId, items: [{ productId, quantity }] });
    } else {
      // If cart exists, update the items array
      let itemIndex = cart.items.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex !== -1) {
        // If product already exists in cart, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // If product is new, add it to the items array
        cart.items.push({ productId, quantity });
      }

      // Save the updated cart
      cart = await cart.save();
    }

    return res.status(200).json({ cart });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Remove item from cart
const removeItem = async (req, res) => {
  try {
    const { productId, userId } = req.body;

    // Find the cart for the current user
    let cart = await Cart.findOne({ userId });

    // Handle case where cart is not found
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    // Filter out the item with the given productId
    cart.items = cart.items.filter((item) => item.productId !== productId);

    // Save the updated cart
    cart = await cart.save();

    // Respond with the updated cart
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

// Get cart items
const getCart = async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user._id; // Assuming userId is extracted from the request

    // Find the cart in the database for the specified userId
    const cart = await Cart.findOne({ userId });

    // If cart is not found, return a 404 Not Found response
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    // If cart is found, return a 200 OK response with the cart details
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error"); // Handle server errors
  }
};

module.exports = { addItem, removeItem, getCart };
