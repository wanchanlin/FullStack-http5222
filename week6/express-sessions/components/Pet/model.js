const mongoose = require("mongoose");

const db = require("../../db"); //shared db stuff

//set up Schema and model
const PetSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number
}); //, { collection: "pets"});
const Pet = mongoose.model("Pet", PetSchema);

//MONGODB FUNCTIONS


//Get all pets from the pets collection
async function getPets() {
  await db.connect();
  return await Pet.find({}); //return array for find all
}

//Initialize pets collection with some initial data
async function initializePets() {
  const petList = [
    {
      name: "Mittens",
      type: "cat",
      breed: "Maine Coon",
      age: 4
    },
    {
      name: "Fred",
      type: "fish",
      breed: "Koi",
      age: 1
    }
  ];
  await Pet.insertMany(petList);
}

async function addPet(petName, petType, petBreed, petAge) {
  await db.connect();
  let newPet = new Pet({
    name: petName,
    type: petType,
    breed: petBreed,
    age: petAge
  });
  
  let result = await newPet.save(); //save to the DB collection
  console.log(result);
}

async function updatePetName(oldName, newName) {
  await db.connect();
  let result = await Pet.updateOne(
    { name: oldName },
    { name: newName }
  );
  //check to see if result.modifiedCount is 1
}

async function deletePetByName(petName) {
  await db.connect();
  let result = await Pet.deleteOne({ name: petName });
}

module.exports = {
  getPets,
  initializePets,
  addPet,
  updatePetName,
  deletePetByName
}