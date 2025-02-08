const express = require("express");
const router = express.Router();
const menuLinks = require("../menuLinks/functions"); //import functions from /menuLinks/functions.js

//PAGE ROUTES
router.get("/", async (request, response) => {
  let links = await menuLinks.getLinks();
  response.render("index", { title: "Home", menu: links });
});
router.get("/about", async (request, response) => {
  let links = await menuLinks.getLinks();
  response.render("about", { title: "About", menu: links });
});

module.exports = router;