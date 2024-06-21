require("dotenv").config();
const express = require("express");
const connectDB = require("./utilities/db"); // Adjust the path as necessary
const authRouter = require("./routerji/auth-route");
const contactRouter = require("./routerji/contact-route");
const cartRouter = require("./routerji/cart-route");
const errorMiddleware = require("./middleware/error-middleware");
const cors = require("cors");

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

const corsOption = {
  origin: "https://bookwoorm.netlify.app",
  methods: "GET , POST ,PUT , PATCH , DELETE",
  credentials: "true",
};

app.use(cors(corsOption));

// Connect to the database
connectDB();

// Use the authRouter for authentication-related routes
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/cart", cartRouter);

app.use(errorMiddleware);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
