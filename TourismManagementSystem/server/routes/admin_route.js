const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminRegister,
  adminUpdate,
  singleViewAdmin,
} = require("../controllers/admin_controller");

router.post("/adminRegister", adminRegister);
router.post("/adminLogin", adminLogin);
router.put("/adminUpdate/:id", adminUpdate);
router.get("/singleAdmin/:id", singleViewAdmin);
module.exports = router;
