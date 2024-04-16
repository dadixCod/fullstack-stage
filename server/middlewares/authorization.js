const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Non Autorisé");
    }

    const payload = jwt.verify(jwtToken, process.env.SECRETKEY);
    req.user_id = payload.userId;
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Non Autorisé");
  }
  next();
};
