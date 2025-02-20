const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */


//Function to retrieve a list of trending movies.
async function getTrendingMovies() {
 let reqURL = `${trakt}/movies/trending`;  
 let response = await fetch(reqURL,{
  headers:{
    "content-type":"application/json",
    "trakt-api-version":2,
    "trakt-api-key":process.env.TRAKT_CLIENT_ID
  }
 });
 return await response.json();
}
//Function to retrieve a list of studios by IMDB movie ID
async function getStudiosByMovieId(imdbId) {
  let reqURL = `${trakt}/movies/${imdbId}/studios`;  
  let response = await fetch(reqURL,{
  headers:{
    "content-type":"application/json",
    "trakt-api-version":2,
    "trakt-api-key":process.env.TRAKT_CLIENT_ID
  }
 });
  return await response.json();
}

module.exports = {
  getTrendingMovies,
  getStudiosByMovieId
};