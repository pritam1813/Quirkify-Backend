// Importing mongoose.js for creating mongoDB schemas
const mongoose = require("mongoose");

//Creating User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default:
        "https://pub-a97d073ded0a4120985495569ad8bd03.r2.dev/defaultAvatar.webp",
    },
  },
  {
    timestamps: true,
  }
);

//Telling mongoose it is a mongoDB model
const User = mongoose.model("User", userSchema);

//Exporting the model
module.exports = User;
