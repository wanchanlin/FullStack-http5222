//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const trakt = require("./components/trakt/api");

//set up Express app
const app = express();
const port = process.env.PORT || 8889;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async (request, response) => {
  let  movie = await trakt.getTrendingMovies();
  response.render("index", { trendingMovies: movie });
});
app.get("/movie/:imdbId/studios", async (request, response) => {
console.log(request.params.imdb);
  let studios = await trakt.getStudiosByMovieId(request.params.imdbId);
  console.log(studios);
  response.render("studios", { movieStudios: studios });
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


