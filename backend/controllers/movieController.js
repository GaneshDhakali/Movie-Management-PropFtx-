const Movie = require("../models/movieModel");

// create new movie
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all movies from database
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({
      success: true,
      data: movies
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single movie using movie name
const getMovieByName = async (req, res) => {
  try {
    const movie = await Movie.findOne({
      movieName: req.params.name
    });

    // if movie not found send 404
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json({
      success: true,
      data: movie
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete movie using id
const deleteMovie = async (req, res, next) => {
  try {

    const movie = await Movie.findByIdAndDelete(req.params.id);

    // handle case if movie does not exist
    if (!movie) {
      const error = new Error("Movie not found");
      error.status = 404;
      return next(error);
    }

    res.json({
      success: true,
      message: "Movie deleted successfully"
    });

  } catch (error) {
    next(error);
  }
};

// update movie details
const updateMovie = async (req, res, next) => {
  try {

    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    // check if movie exists before updating
    if (!movie) {
      const error = new Error("Movie not found");
      error.status = 404;
      return next(error);
    }

    res.json({
      success: true,
      data: movie
    });

  } catch (error) {
    next(error);
  }
};

// search movies using partial name match
const searchMovies = async (req, res, next) => {
  try {

    const keyword = req.query.name;

    const movies = await Movie.find({
      movieName: {
        $regex: keyword,
        $options: "i"
      }
    });

    res.json({
      success: true,
      data: movies
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMovie,
  getMovies,
  getMovieByName,
  deleteMovie,
  updateMovie,
  searchMovies
};