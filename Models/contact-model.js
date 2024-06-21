const mongoose = require("mongoose");

// Define the schema for the Contact collection
const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Email is a required field
  },
  message: {
    type: String,
    required: true, // Message is a required field
  },
});

// Create the Contact model based on the schema
const Contact = mongoose.model("Contact", contactSchema);

// Export the Contact model to use it in other parts of the application
module.exports = Contact;
