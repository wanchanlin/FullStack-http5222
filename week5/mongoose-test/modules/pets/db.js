const mongoose = require("mongoose");

//const dbUrl = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}/?authSource=testdb`;
const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const PetSchema = new mongoose.Schema({
  name: String,
  type: String,
  breed: String,
  age: Number
});

const Pet = mongoose.model("Pet", PetSchema);

//MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
}

//Get all pets from the pets collection
async function getPets() {
  await connect();
  return await Pet.find({}); //return array for find all
}

//initialize pet collection with insitial data
async function initializePets(){
  const petList= [
    {
      name:"Mitten",
      type:"Cat",
      breed:"Maine Coon",
      age:5
    },
    { 
      name:"Wasabi",
      type:"Cat",
      breed:"Moo",
      age:2

    }
  ];
  await Pet.insertMany(petList);
}

async function addPet(petName, petType, petBreed, petAge){
 
  let newPet = new Pet({
    name: petName,
    type: petType,
    breed: petBreed,
    age: petAge
   
  });

  await newPet.save(); //save to the db collection
 console.log(result);
}

async function updatePetName(oldName, newName) {
  let result = await Pet.updateOne(
    { name: oldName },
    { name: newName }
  );
}

async function deletePetbyName(petName) {
  let result = await Pet.deleteOne({ name: petName });
}


module.exports = {
  getPets,
  initializePets,
  addPet,
  updatePetName,
  deletePetbyName
}