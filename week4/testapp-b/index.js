//IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path"); //contains methods to help with path concatenation
const dotenv = require("dotenv"); //import dotenv module to read .env file

//load environment variables from .env file
dotenv.config();


//IMPORT PAGE ROUTERS
const adminRouter = require("./modules/menulinks/router");
const pageRouter = require("./modules/pages/router");

//SET UP EXPRESS APP
const app = express(); //express() is a function to initialize an Express app
const port = process.env.PORT || "8889";

//SET UP TEMPLATE ENGINE
app.set("views", path.join(__dirname, "templates")); //set "views" to use the <app_directory>/templates folder to store template files
app.set("view engine", "pug");//set Express to use Pug as the template (view) engine

//SET UP FOLDER FOR STATIC FILES (CSS, client-side JS)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true })); //extend the urlencoded format (i.e. query string format like weight=0&path=/&name=Home)
app.use(express.json()); //allow for form data retrieval as JSON { weight: 0, path: "/", name: "Home"}


//SET UP ROUTER TO USE FOR PAGE PATHS
app.use("/", pageRouter);
app.use("/admin/menu", adminRouter);

//SET UP SERVER LISTENING
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

