const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req, res, next) => {
  try {
    // we here extrating the token innheader and spliit it out from string
    const token = req.headers["authorization"].split(" ")[1];
    // first parameter is the token and second parameter is the secret t
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .send({ message: "unauthorized", success: false });
      } else {
        req.body.userId = decoded._id;
        next();
      }
    });
  } catch (error) {
    res.status(401).send({ message: "unauthorized", success: false });

  }
};
