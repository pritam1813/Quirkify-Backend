const Router = require("express").Router();
const postController = require("../controllers/postController");

Router.get("/", postController.allPosts);

Router.post("/create", postController.create);

module.exports = Router;
