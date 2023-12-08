const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db/db");
const { router } = require("./routes/routes");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { logger } = require("./middleware/verifyToken");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: [
      "https://rococo-cocada-6bff95.netlify.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

connectToDatabase()
  .then(() => {
    app.post("/jwt", logger, async (req, res) => {
      const user = req.body;
      console.log(user);
      const token = jwt.sign(user, process.env.JWT_TOKEN, {
        expiresIn: "1h",
      });
      res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({ success: true });
    });

    app.post("/logout", async (req, res) => {
      const user = req.body;
      console.log("user logout", user);
      res.clearCookie("access_token", { maxAge: 0 }).send({ success: true });
    });

    app.use("/", router);

    app.get("/", (req, res) => {
      res.send("CAREER MAKER SERVER is running");
    });
    app.listen(port, () => {
      console.log("Running successfully on port", port);
    });
  })
  .catch((err) => console.log(err));
