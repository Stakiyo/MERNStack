const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/customer");
const {
  userRegister,
  userRead,
  userUpdate,
  userLogin,
  singleViewUser,
  numberOfRegisteredUsers,
} = require("../controllers/user_controller");

router.post("/registerUser", userRegister);
router.post("/loginUser", userLogin);
router.get("/getUsers", userRead);
router.get("/singleUser/:id", singleViewUser);
router.put("/updateUser/:id", userUpdate);
router.get("/usersCount", numberOfRegisteredUsers);

module.exports = router;
