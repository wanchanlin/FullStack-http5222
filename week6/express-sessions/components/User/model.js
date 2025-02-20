const mongoose = require("mongoose");
const { scryptSync } = require("crypto");

const db = require("../../db"); //shared db stuff
const { loginForm, logout } = require("./controller");
const { register } = require("module");

const UserSchema = new mongoose.Schema({
  user: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

async function authenticateUser(username, pw) {
  await db.connect();
  let key = scryptSync(pw, process.env.SALT, 64);
  //check for existing user with matching hashed password
  let result = await User.findOne({
    user: username,
    password: key.toString("base64")
  });
  if (result)
    return true;
  else
    return false;
}
async function getUser(username) {
  await db.connect();
  //just check if username exists already
  let result = await User.findOne({ user: username });
  /* if (result) {
    return result;
  }
  return false; */
  return (result) ? result : false;
}
async function addUser(username, pw) {
  await db.connect();
  //add user if username doesn't exist
  let user = await getUser(username);
  console.log(user);
  if (!user) {
    let key = scryptSync(pw, process.env.SALT, 64);
    let newUser = new User({
      user: username,
      password: key.toString("base64")
    });
    let result = await newUser.save();
    if (result === newUser)
      return true;
    else  
      return false;
  } else {
    return false;
  }
}

const login = async (request, response) => {

  //authenticate user and redirect to /user
  
  }
  
  const logout = (request, response) => {
  
  //destroy session and redirect to home
  
  }
  const registerForm = (request, response) => {

    response.render("user/register");
    
    }
      

module.exports = {
  getUser,
  // authenticateUser,
  loginForm,
  login,
  logout,
  addUser,
  registerForm,
  register
}