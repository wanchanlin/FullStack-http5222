const mongoose = require("mongoose");

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String
});

const Movie = mongoose.model("Movie", MovieSchema);
async function connect() {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(dbUrl);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw new Error("Database connection failed");
    }
  }
}

async function getMovies() {
  await connect();
  return await Movie.find({});
}

async function initializeMovies() {
  const movieList = [
    { title: "Transformers", year: 2007, rating: "G" },
    { title: "500 Days of Summer", year: 2015, rating: "G" }
  ];

  await Movie.insertMany(movieList);
}

async function addMovie(movieTitle, movieYear, movieRating) {
  let newMovie = new Movie({ title: movieTitle, year: movieYear, rating: movieRating });
  let result = await newMovie.save();
  console.log(result);
}

async function updateMovieRating(oldRating, newRating) {
  let result = await Movie.updateOne({ rating: oldRating }, { rating: newRating });
  console.log(result);
}

async function deleteMoviesByRating(rating) {
  let result = await Movie.deleteMany({ rating: rating });
  console.log(result);
}

module.exports = {
  getMovies,
  initializeMovies,
  addMovie,
  updateMovieRating,
  deleteMoviesByRating
};
