const express = require("express");
const router = express.Router();
const {
  packageBooking,
  packageBookingUserRead,
  packageBookingAdminRead,
  numberOfBookings,
  singleViewBooking,
  updateBooking,
  newBookings,
  confirmedBookings,
  cancelledBookings,
} = require("../controllers/booking_controller");
const fetchUser = require("../middleware/customer");
const fetchAdmin = require("../middleware/admin");
router.post("/packageBooking", packageBooking);
router.get("/readBookingUser", fetchUser, packageBookingUserRead);
router.get("/readBookingAdmin", fetchAdmin, packageBookingAdminRead);
router.get("/singleViewBooking/:id", singleViewBooking);
router.get("/bookingsCount", numberOfBookings);
router.get("/newBookingsCount", newBookings);
router.get("/confirmedBookingsCount", confirmedBookings);
router.get("/cancelledBookingsCount", cancelledBookings);
router.patch("/updateBookings/:id", updateBooking);

module.exports = router;
