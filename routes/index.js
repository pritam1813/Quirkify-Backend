const router = require("express").Router();

router.get("/", (req, res) => {
  return res.send("<h2>Hello</h2>");
});

router.use("/user", require("./users"));

router.use("/post", require("./posts"));

module.exports = router;
