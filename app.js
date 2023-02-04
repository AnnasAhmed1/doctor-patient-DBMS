const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./routes/routes");
// require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const BASE_URI =
  "mongodb+srv://authcrud:authcrud@authcrudcluster.gwoeqik.mongodb.net";

app.use(express.json());

mongoose
  .connect(BASE_URI)
  .then((response) => {
    console.log("mongodb running");
  })
  .catch((error) => {
    console.log("error in mongodb", error);
  });

app.use(cors());

app.use("/api", router);

// app.get("/api/test", (req, res) => {

//   res.send("test api");
// });

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
