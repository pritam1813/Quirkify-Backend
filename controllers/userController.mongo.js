/* Responsible for different actions within user Route */

//Imports
const User = require("../models/users"); //Database Model user
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports.profile = async function (req, res) {
  try {
    // To be done
  } catch (error) {
    console.log(error);
  }
};

//User Sign In route for rendering Sign In page
module.exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const payload = { user };
      let token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      res.json({
        success: true,
        user,
        token,
      });
    } else {
      res.json({ message: "Incorrect password" });
    }
    return;
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Action for Creating/Signing Up a user and storing the Data in the Database
module.exports.signup = async function (req, res) {
  try {
    //If the password and confirm password doesn't match then we will not create user
    // if (req.body.password != req.body.confirm_password) {
    //   return res.redirect("back");
    // }
    let { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    const newUser = await User.create({ firstName, lastName, email, password });

    let token = jwt.sign({ newUser }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    if (token) {
      res.json({
        success: true,
        user: newUser,
        token,
      });
    } else {
      res.json({ message: "Forbidden!!" });
    }
    return;
  } catch (err) {
    console.log(`Error: ${err}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Action for updating user data
module.exports.updateUser = async function (req, res) {
  //to be done
};
