const router = require("express").Router();
const usercontroller = require("../controllers/userControllers");

router.get("/", (req, res) => {
  return res.send("<h2>Hello</h2>");
});
router.get("/profile", usercontroller.profile);

router.post("/signup", usercontroller.createUser);

router.post("/login", usercontroller.login);

router.put("/update", usercontroller.updateUser);

router.get("/signout", usercontroller.signout);

router.delete("/delete", usercontroller.deleteUser);

module.exports = router;
