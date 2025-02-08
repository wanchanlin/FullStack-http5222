//IMPORT REQUIRED MODULES
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

//connect to db
const dbUrl = "mongodb://localhost:27017/testdb";
const client = new MongoClient(dbUrl);

//SET UP EXPRESS APP
const app = express();
const port = process.env.PORT || "8888";

//SET UP TEMPLATE ENGINE
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "pug");

//SET UP FOLDER FOR STATIC FILES (CSS, client-side JS)
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//TEST APP PATH
app.get("/", async (request, response) => {
  let links = await getLinks();
  response.render("index", { title: "Home", menu: links });
});

app.get("/about", async (request, response) => {
  let links = await getLinks();
  response.render("about", { title: "About", menu: links });
});

//admin page
app.get("/admin/menu", async (request, response) => {
  let links = await getLinks();
  response.render("menu-list", { title: "Admin", menu: links });
});

app.get("/admin/menu/add", async (request, response) => {
  let links = await getLinks();
  response.render("menu-add", { title: "Add menu", menu: links });
});

app.post('/admin/menu/add/submit', async (request, response) => {
  let newLink = {
    //get form data
    weight: request.body.weight,//get the value for field with name="weight"
    path: request.body.path,
    name: request.body.name
  };
  await addLink(newLink);
  response.redirect("/admin/menu");
});

app.post('/admin/menu/delete', async (request, response) => {
  let id = request.body.linkId;
  await deleteLink(id);
  response.redirect("/admin/menu");
});

//Edit page
app.get("/admin/menu/edit", async (request, response) => {
  if (request.query.linkId) {
    let linkToEdit = await getSingleLink(request.query.linkId);
    let links = await getLinks();
    response.render("menu-edit", { title: "Edit menu link", menu: links, editLink: linkToEdit });
  } else {
    response.redirect("/admin/menu");
  }
});

app.post("/admin/menu/edit/submit", async (request, response) => {
  //get the _id and set it as a JSON object to be used for the filter 
  let idFilter = {
    _id: new ObjectId(request.body.linkId)
  };
  let link = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };

  await editLink(idFilter, link);
  response.redirect("/admin/menu");
});

     async function editLink(filter, link) { 
      db = await connection();
      
     }


//SET UP SERVER LISTENING
app.listen(port, async () => {
              await client.connect();
            console.log(`Listening at http://localhost:${port}`);
});

            //MONGODB helper function

            // Function to connect and return to the database
            async function connection() {
              db = client.db();
            return db;
}

            //get all menu links
            async function getLinks() {
              db = await connection();
            let results = db.collection("menulinks").find({ });
            let resultsArray = await results.toArray();
            return resultsArray;
}

            //add a new menu link
            async function addLink(link) {
              db = await connection();
            await db.collection("menulinks").insertOne(link);
}

            //delete a menu link
            async function deleteLink(id) {
              db = await connection();
            let query = {_id: new ObjectId(id) };
            await db.collection("menulinks").deleteOne(query);
}

async function getSingleLink(id) {
  db = await connection();
  let link = await db.collection("menulinks").findOne({ _id: new ObjectId(id) });
  return link;
}