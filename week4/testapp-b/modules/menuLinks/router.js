const express = require("express");
const router = express.Router();
const menuLinks = require("./functions");

//ADMIN PAGES
router.get("/", async (request, response) => {
  let links = await menuLinks.getLinks();
  //render admin page
  response.render("admin/menu-list", { title: "Administer menu", menu: links });
});
router.get("/add", async (request, response) => {
  let links = await menuLinks.getLinks();
  //render admin page
  response.render("admin/menu-add", { title: "Add menu link", menu: links });
});
router.post("/add/submit", async (request, response) => {
  //for POST forms (for this form submission), data is sent in request.body
  //for GET forms, data is sent in request.query
  //console.log(request.body.path);
  let newLink = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };
  await menuLinks.addLink(newLink);
  response.redirect("/admin/menu"); //redirect back to main menu admin page
});
router.get("/delete", async (request, response) => {
  console.log(request.query.linkId);
  let id = request.query.linkId;
  await menuLinks.deleteLink(id);
  response.redirect("/admin/menu");
})

module.exports = router;