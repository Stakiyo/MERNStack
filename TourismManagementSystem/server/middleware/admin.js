const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "Tourism";

const fetchAdmin = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.send("token not found");
  } else {
    try {
      const adminId = jsonwebtoken.verify(token, SECRET_KEY);
      req.admin = adminId;
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = fetchAdmin;
