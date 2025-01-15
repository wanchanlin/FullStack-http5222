const { response } = require("express");
const { request } = require("http");
const path = require ("path");
const express = require ("express");
const { title } = require("process");
const app = express();
const port = process.env.PORT || "8888";

//set up template engine
app.set("views", path.join(__dirname, "templates"));
// //set 'view' t0 uset the app
app.set("view engine", "pug");
//set up
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(request,response)=>{
    //  response.status(200).send("Test");
    response.render("index", {title: "Home"});
  });
app.get("/about",(request,response)=>{
    response.render("about", {title: "About"});
});



app.listen( port, () =>{
    console.log(`Listening on http://localhost:${port}`)
})