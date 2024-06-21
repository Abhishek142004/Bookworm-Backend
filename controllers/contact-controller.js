const Contact = require("../Models/contact-model"); // Import Contact model

// Controller function to handle feedback submission
const feedback = async (req, res) => {
  try {
    const response = req.body; // Extract the request body data
    await Contact.create(response); // Create a new contact record in the database

    // Send a success response with status code 201 and a JSON message
    res.status(201).json({
      msg: "Feedback Successful",
    });
  } catch (error) {
    // Handle errors with a server error response
    res.status(500).send("Error");
  }
};

module.exports = { feedback }; // Export the feedback function for use in routes
