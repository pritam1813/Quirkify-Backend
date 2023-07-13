const router = require("express").Router();
const postController = require("../controllers/postController");

router.get("/", postController.allPosts);

router.post("/create", postController.create);

module.exports = router;
