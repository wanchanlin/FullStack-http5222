const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

const db = require("./modules/movies/db"); // Load db.js

// Set up the Express app
const app = express();
const port = process.env.PORT || "8888";

// Set up application template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

// USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let movieList = await db.getMovies();
  
  // If there are no movies in the collection, initialize with default movies, then retrieve them again.
  if (!movieList.length) {
    await db.initializeMovies();
    movieList = await db.getMovies();
  }
  
  response.render("index", { movies: movieList });
});

app.get("/add", async (request, response) => {
  await db.addMovie("Wolf Man", 2025, "R");
  response.redirect("/");
});

app.get("/update", async (request, response) => {
  await db.updateMovieRating("R", "G");
  response.redirect("/");
});

app.get("/delete", async (request, response) => {
  await db.deleteMoviesByRating("R"); // Delete all movies with rating "R"
  response.redirect("/");
});

// Set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
