const express = require("express");
const router = express.Router();

const {
  enquiryCreate,
  enquiryRead,
  enquiryDelete,
  numberOfEnquiries,
  updateEnquiry,
  readEnquiries,
  newEnquiries,
} = require("../controllers/enquiry_controller");

router.post("/createEnquiry", enquiryCreate);
router.get("/readEnquiry", enquiryRead);
router.delete("/deleteEnquiry/:id", enquiryDelete);
router.get("/enquiriesCount", numberOfEnquiries);
router.get("/readEnquiriesCount", readEnquiries);
router.get("/newEnquiriesCount", newEnquiries);
router.patch("/updateEnquiry/:id", updateEnquiry);

module.exports = router;
