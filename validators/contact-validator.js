const { z } = require("zod");

// Define the contactSchema using zod's object schema
const contactSchema = z.object({
  email: z
    .string()
    .email("Invalid email address") // Email must be a valid email address
    .nonempty("Email is required"), // Email is required and must not be empty

  message: z.string().min(1, "Message is required"), // Message is required and must have at least 1 character
});

module.exports = contactSchema;
