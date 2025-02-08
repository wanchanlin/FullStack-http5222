const { MongoClient, ObjectId } = require("mongodb"); //import MongoClient from mongodb

//Connect to DB
// const dbUrl = "mongodb://127.0.0.1:27017/testdb";
const dbUrl = process.env.MONGOURI; //get the DB URL from the environment variables
// //connection string to connect to localhost db and select the testdb database
const client = new MongoClient(dbUrl);

//MONGODB HELPER FUNCTIONS

//Function to connect and return the testdb database
async function connection() {
  db = client.db('testdb'); //select the testdb database
  return db;
}

//Get all menu links
async function getLinks() {
  db = await connection();
  let results = db.collection("menuLinks").find({}); //use empty {} as the query to select (find) all
  let resultArray = await results.toArray(); //convert the results pointer to an array we can use (toArray() is an asynchronous method so we need to use await)
  return resultArray;
}

//expects a link JSON object to be inserted into menuLinks
async function addLink(link) {
  db = await connection();
  let status = await db.collection("menuLinks").insertOne(link);
  console.log("link added");
}

async function deleteLink(id) {
  db = await connection();
  let query = { _id: new ObjectId(id) };
  let result = await db.collection("menuLinks").deleteOne(query);
}

module.exports = {
  getLinks,
  addLink,
  deleteLink
};