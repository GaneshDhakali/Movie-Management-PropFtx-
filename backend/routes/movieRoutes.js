const express = require("express");
const router = express.Router();

// middleware to validate movie data before creating
const validateMovie = require("../middleware/validateMovie");

// importing controller functions
const {
  createMovie,
  getMovies,
  getMovieByName,
  deleteMovie,
  updateMovie,
  searchMovies
} = require("../controllers/movieController");

router.get("/search", searchMovies);

router.post("/", validateMovie, createMovie);

router.get("/", getMovies);

router.get("/:name", getMovieByName);

router.delete("/:id", deleteMovie);

router.put("/:id",validateMovie, updateMovie);

module.exports = router;