const mongoose = require("mongoose");

// schema to define movie structure in database
const movieSchema = new mongoose.Schema({
  movieName: {
    type: String,
    required: true   // movie name must be provided
  },
  genre: {
    type: String,
    required: true   // genre is mandatory
  },
  releaseYear: {
    type: Number,
    required: true   
  },
  rating: {
    type: Number,
    required: true,
    min: 1,          
    max: 10          
  }
},{
  versionKey:false   // removes __v field from documents
});

// creating movie model from schema
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;