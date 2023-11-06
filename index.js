const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db/db");
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

connectToDatabase()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("CAREER MAKER SERVER is running");
    });
    app.listen(port, () => {
      console.log("Running successfully");
    });
  })
  .catch((err) => console.log(err));
