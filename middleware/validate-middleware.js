// validate.js

// Middleware function to validate request body against a schema
const validate = (schema) => async (req, res, next) => {
  try {
    // Parse and validate the request body against the provided schema
    const parsedBody = await schema.parseAsync(req.body);

    // If validation succeeds, update req.body with the parsed data
    req.body = parsedBody;

    // Pass control to the next middleware function in the chain
    next();
  } catch (error) {
    // If validation fails, handle the error and send a response
    res.status(400).json({ msg: error.errors[0].message });
  }
};

module.exports = validate; // Export the validate middleware function for use in other parts of the application
