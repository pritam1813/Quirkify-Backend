const Router = require("express").Router();

Router.get("/", (req, res) => {
  return res.send("<h2>Hello</h2>");
});

Router.use("/user", require("./users"));

Router.use("/post", require("./posts"));

module.exports = Router;
