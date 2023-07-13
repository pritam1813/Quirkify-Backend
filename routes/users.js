const Router = require("express").Router();
const usercontroller = require("../controllers/userControllers");

Router.get("/", (req, res) => {
  return res.send("<h2>Hello</h2>");
});
Router.get("/profile", usercontroller.profile);

Router.post("/signup", usercontroller.createUser);

Router.post("/login", usercontroller.login);

Router.put("/update", usercontroller.updateUser);

Router.get("/signout", usercontroller.signout);

Router.delete("/delete", usercontroller.deleteUser);

module.exports = Router;
