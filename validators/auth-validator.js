const { z } = require("zod");

// Define the userSchema using zod's object schema
const userSchema = z.object({
  username: z
    .string()
    .min(1, "Name is required") // Username must have at least 1 character
    .max(100, "Name must be less than 100 characters"), // Username must be less than 100 characters

  email: z
    .string()
    .email("Invalid email address") // Email must be a valid email address
    .min(1, "Email is required"), // Email is required and must have at least 1 character

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long") // Password must be at least 8 characters long
    .max(100, "Password must be less than 100 characters") // Password must be less than 100 characters
    .regex(/[a-z]/, "Password must contain at least one lowercase letter") // Password must contain at least one lowercase letter
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter") // Password must contain at least one uppercase letter
    .regex(/[0-9]/, "Password must contain at least one number") // Password must contain at least one number
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character" // Password must contain at least one special character
    ),
});

module.exports = userSchema;
