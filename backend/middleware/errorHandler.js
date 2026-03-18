// global error handling middleware
const errorHandler = (err, req, res, next) => {

  // printing error stack in server console for debugging
  console.error(err.stack);

  // sending proper error response to client
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });

};

module.exports = errorHandler;