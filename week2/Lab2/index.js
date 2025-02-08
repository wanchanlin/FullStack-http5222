//import required modules
const express = require("express");
const path = require("path");
//set up Express object and port
const app = express();
const port = process.env.PORT || "8888";
//test message
app.get("/", (req, res) => {
    // res.status(200).send("Test page");
    res.render("index", { title: "Home" });
});
app.get("/about", (req, res) => {
    res.render("about", { title: "about" });
});
app.get("/bestlist", (req, res) => {
    res.render("bestlist", { title: "bestlist" });
});
app.get("/login", (req, res) => {
    res.render("login", { title: "login" });
});

app.set("views", path.join(__dirname, "pages"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

//set up server listening
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});