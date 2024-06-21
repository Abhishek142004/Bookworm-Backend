const User = require("../Models/user-model"); // Import User model
const bcrypt = require("bcryptjs"); // Import bcrypt for password hashing
const authMiddleware = require("../middleware/auth-middleware");
// const fs = require("fs");
// const path = require("path");
// const bodyParser = require("body-parser");

// Controller function to handle home route
const home = async (req, res) => {
  try {
    res.send("Hello World From Controllers"); // Send a simple message
  } catch (error) {
    res.status(500).send("Error"); // Handle server error
  }
};

// Controller function to handle user registration
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Destructure user inputs

    // Check if user with the same email already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Create a new user with hashed password and initial balance of 500
    const userCreated = await User.create({
      username,
      email,
      password,
      balance: 500,
    });

    // Return success message and token for authentication
    res.status(201).json({
      msg: "Registration Successful",
      token: await userCreated.generateToken(), // Generate JWT token
      userId: userCreated._id.toString(), // Convert user ID to string
      balance: userCreated.balance, // Include the balance in the response
    });
  } catch (error) {
    res.status(500).send("Error"); // Handle server error
  }
};

// Controller function to handle user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure email and password

    // Check if user with the provided email exists
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // Validate user's password
    const isValidPassword = await userExist.comparePassword(password);
    if (isValidPassword) {
      // Return success message and token for authentication
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(), // Generate JWT token
        userId: userExist._id.toString(), // Convert user ID to string
        balance: userExist.balance, // Include the balance in the response
      });
    } else {
      res.status(401).json({ msg: "Invalid password" });
    }
  } catch (error) {
    res.status(500).send("Error"); // Handle server error
  }
};

// User Logic
const userLogic = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    res.status(200).json({ msg: userData });
  } catch (error) {
    console.log(error);
  }
};

// //Add Book
// const addBook = async (req, res) => {
//   try {
//     // Destructure book details from request body
//     const {
//       id,
//       name,
//       author,
//       category,
//       price,
//       seller_name,
//       image_url,
//       created_by,
//     } = req.body;

//     // Path to Books.json file in the frontend's public folder
//     const booksFilePath = path.join(
//       __dirname,
//       "../../Frontend/Bookworm/src/Books.json"
//     );

//     // Read existing books data
//     let booksData = [];
//     try {
//       const booksContent = fs.readFileSync(booksFilePath, "utf8");
//       booksData = JSON.parse(booksContent);
//     } catch (readError) {
//       console.error("Error reading books data:", readError);
//       throw readError;
//     }

//     // Create new book object
//     const newBook = {
//       id,
//       name,
//       author,
//       category,
//       price,
//       seller_name,
//       image_url,
//       created_by,
//     };

//     // Add new book to existing array
//     booksData.push(newBook);

//     // Write updated data back to the file
//     fs.writeFileSync(booksFilePath, JSON.stringify(booksData, null, 2));

//     // Respond with updated data
//     res.status(201).json({ msg: "Book added successfully", books: booksData });
//   } catch (error) {
//     console.error("Error adding book:", error);
//     res.status(500).send("Error adding book");
//   }
// };

const updateUserBalance = async (req, res) => {
  try {
    const userId = req.user;
    const { amount } = req.body; // amount to deduct or add

    // Ensure amount is a valid number
    if (typeof amount !== "number") {
      return res.status(400).json({ msg: "Invalid amount" });
    }

    // Find the user and update their balance
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { balance: -amount } }, // Deduct the amount from the balance
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    return res.status(200).json({ balance: user.balance });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = { home, register, login, userLogic, updateUserBalance }; // Export controller functions
