const mongoose = require("mongoose");
const uri = process.env.URI; // URI from environment variables (dotenv)

const connect = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri);

    // If connection is successful, log this message
    console.log("Successful Connection");
  } catch (error) {
    // If there's an error during connection, log the error message
    console.error("Connection error:", error.message);

    // Optionally, log the full error details for debugging purposes
    console.error("Full error details:", error);
  }
};

module.exports = connect;
