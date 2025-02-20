const express = require("express");
const router = express.Router();

const { getAllPets } = require("./controller");

router.get("/", getAllPets);

module.exports = router;