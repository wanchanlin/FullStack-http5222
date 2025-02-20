const petModel = require("./model");

const getAllPets = async (request, response) => {
  let petList = await petModel.getPets();
  //if there's nothing in the pets collection, initialize with some content then get the pets again
  if (!petList.length) {
    await petModel.initializePets(); 
    petList = await petModel.getPets();
  }
  response.render("index", { pets: petList });
};

module.exports = {
  getAllPets
};