// middleware/errorMiddleware.js

// Middleware function to handle errors
const errorMiddleware = (err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes

  // Check if the response headers have already been sent
  if (res.headersSent) {
    // If headers are already sent, delegate to the default Express error handler
    return next(err);
  }

  // If headers have not been sent, handle the error by setting the status and sending a JSON response
  const status = err.status || 500; // Default to 500 Internal Server Error if status is not provided
  const message = err.message || "Internal Server Error"; // Default error message if not provided

  res.status(status).json({ msg: message }); // Send JSON response with status and message
};

module.exports = errorMiddleware; // Export the errorMiddleware function for use in other parts of the application
