const validateMovie = (req, res, next) => {

  const { movieName, genre, releaseYear, rating } = req.body;

  if (!movieName || !genre || !releaseYear || !rating) {
    const error = new Error("All fields are required");
    error.status = 400;
    return next(error);
  }

  
  const year = Number(releaseYear);
  const currentYear = new Date().getFullYear();

  if (year < 1888 || year > currentYear) {
    const error = new Error("Enter valid release year");
    error.status = 400;
    return next(error);
  }
  const rate = Number(rating);

  if (rating < 1 || rating > 10) {
    const error = new Error("Rating must be between 1 and 10");
    error.status = 400;
    return next(error);
  }

  next();
};

module.exports = validateMovie;