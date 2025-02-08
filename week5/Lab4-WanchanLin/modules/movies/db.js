const mongoose = require("mongoose");

//const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?authSource=testdb`;
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;
// Define Schema and Model
const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String
});

const Movie = mongoose.model("Movie", MovieSchema);

// MongoDB Functions
async function connect() {
  await mongoose.connect(dbUrl); // Connect to MongoDB
}

async function getMovies() {
  await connect();
  return await Movie.find({}); // Return array of all movies
}

async function initializeMovies() {
  const movieList = [
    {
      title: "Transformers",
      year: 2007,
      rating: 'G'
    },
    {
      title: "500 Days of Summer",
      year: 2015,
      rating: 'G'
    }
  ];
  await connect();
  await Movie.insertMany(movieList);
}

async function addMovie(movieTitle, movieYear, movieRating) {
  let newMovie = new Movie({
    title: movieTitle,
    year: movieYear,
    rating: movieRating
  });

  await connect();
  const result = await newMovie.save(); // Save to the DB collection
  console.log(result);
}

async function updateMovieTitle(oldTitle, newTitle) {
  await connect();
  let result = await Movie.updateOne(
    { title: oldTitle },
    { title: newTitle }
  );
  console.log(result);
}

async function deleteMovieByTitle(movieTitle) {
  await connect();
  let result = await Movie.deleteOne({ title: movieTitle });
  console.log(result);
}

module.exports = {
  getMovies,
  initializeMovies,
  addMovie,
  updateMovieTitle,
  deleteMovieByTitle
};