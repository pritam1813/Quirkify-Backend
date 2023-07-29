const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const db = require("./config/mongoose");

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));

app.listen(port, () => {
  console.log(`App Running on PORT: ${port} \nhttp://localhost:${port} `);
});
