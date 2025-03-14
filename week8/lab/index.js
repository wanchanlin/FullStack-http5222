const express = require("express");
const path = require("path");

// const parks = require("./components/parks");
// const cameras = require("./components/cameras/cameras");
const libraries = require("./components/libraries");

const app = express();
const port = process.env.PORT || "8889";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));



app.get("/", async (request, response) => {
 
  let data = await libraries.loadLibraries();
   response.render("index", { title: "Home", libraries: data }); 

});

app.get("/library/:id", async (request, response) => { 
  let libData = await libraries.getLibraryById(request.params.id);  
  response.render("library", { title: "Library", library: libData });  
});


//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});