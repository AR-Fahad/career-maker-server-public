const jwt = require("jsonwebtoken");

exports.verifyToken = async (req, res, next) => {
  const token = req?.cookies?.access_token;
  if (!token) {
    return res.status(401).send({ message: "not authorized" });
  }
  jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "unauthorized" });
    }
    console.log(decoded);
    req.decoded = decoded;
    next();
  });
};
