const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "Tourism";

const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.send("token not found");
  } else {
    try {
      const userId = jsonwebtoken.verify(token, SECRET_KEY);
      req.customer = userId;
      next();
    } catch (error) {
      console.log(error);
    }
  }
};
module.exports = fetchUser;
