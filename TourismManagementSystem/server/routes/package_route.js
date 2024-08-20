const express = require("express");
const router = express.Router();
const {
  packageInsert,
  packageRead,
  packageUpdate,
  packageDelete,
  singleViewPackage,
  getPackageAmount,
  numberOfPackages,
} = require("../controllers/package_controller");

router.post("/createPackage", packageInsert);
router.get("/readPackage", packageRead);
router.put("/updatePackage/:id", packageUpdate);
router.delete("/deletePackage/:id", packageDelete);
router.get("/viewPackage/:id", singleViewPackage);
router.get("/getAmount/:pname", getPackageAmount);
router.get("/packageCount", numberOfPackages);

module.exports = router;
