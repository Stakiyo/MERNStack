const express = require("express");
const router = express.Router();
const {
  createPayment,
  readPayment,
  singlePayment,
  singleBookingPayment,
  updatePayment,
  numberOfPayments,
} = require("../controllers/payment_controller");

router.post("/paymentCreate", createPayment);
router.get("/paymentRead", readPayment);
router.get("/singlePayment/:id", singlePayment);
router.post("/singleBookingPayment", singleBookingPayment);
router.get("/numberOfPayments", numberOfPayments);
router.patch("/updatePayment/:id", updatePayment);

module.exports = router;
