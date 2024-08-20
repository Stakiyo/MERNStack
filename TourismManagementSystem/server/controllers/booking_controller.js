const bookingSchema = require("../models/booking_model");

const packageBooking = async (req, res) => {
  try {
    const { name, email, mobile, persons, grandTotal, packageId, userId } =
      req.body;
    const bookingInfo = new bookingSchema({
      name,
      email,
      mobile,
      persons,
      grandTotal,
      customer_id: userId,
      package_id: packageId,
      booking_status: "Pending",
    });
    let b_email = await bookingSchema.findOne({ email: email });
    let b_phone = await bookingSchema.findOne({ mobile: mobile });

    if (b_email) {
      console.log("Email already exists");
    } else if (b_phone) {
      console.log("Mobile already exists");
    } else {
      const bookingSaved = await bookingInfo.save();
      console.log("Package booked successfully");
      res.json({
        success: true,
        message: "Package booked successfully",
        booking: bookingSaved,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const packageBookingUserRead = async (req, res) => {
  try {
    const bookingInfo = await bookingSchema
      .find({ customer_id: req.customer })
      .populate("package_id")
      .populate("customer_id");
    res.send(bookingInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const packageBookingAdminRead = async (req, res) => {
  try {
    const bookingInfo = await bookingSchema
      .find()
      .populate("package_id")
      .populate("customer_id");
    res.send(bookingInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const singleViewBooking = async (req, res) => {
  try {
    const bookingInfo = await bookingSchema
      .findById(req.params.id)
      .populate("package_id");
    if (!bookingInfo) {
      return res.status(404).send("Not Found");
    } else {
      res.json({
        bookingInfo: bookingInfo,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const numberOfBookings = async (req, res) => {
  try {
    const bookingsCount = await bookingSchema.countDocuments();
    res.json({
      success: true,
      message: "Bookings fetched successfully",
      count: bookingsCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching bookings count");
  }
};
const newBookings = async (req, res) => {
  try {
    const newBookingsCount = await bookingSchema.countDocuments({
      booking_status: "Pending",
    });
    res.json({
      success: true,
      count: newBookingsCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching new bookings count");
  }
};

const confirmedBookings = async (req, res) => {
  try {
    const confirmedBookingsCount = await bookingSchema.countDocuments({
      booking_status: "Confirmed",
    });
    res.json({
      success: true,

      count: confirmedBookingsCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching new bookings count");
  }
};

const cancelledBookings = async (req, res) => {
  try {
    const cancelledBookingsCount = await bookingSchema.countDocuments({
      booking_status: "Cancelled",
    });
    res.json({
      success: true,
      count: cancelledBookingsCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching new bookings count");
  }
};

const updateBooking = async (req, res) => {
  try {
    let bookingData = await bookingSchema.findById(req.params.id);
    if (!bookingData) {
      console.log("Bookings not found!");
      return res.status(404).send("Not Found");
    } else {
      const { booking_status } = req.body;
      const newBooking = {};
      if (booking_status) {
        newBooking.booking_status = booking_status;
      }

      bookingData = await bookingSchema.findByIdAndUpdate(
        req.params.id,
        { $set: newBooking },
        { new: true }
      );
      console.log("Booking updated successfully");
      res.json({
        message: "Booking updated successfully",
        updatedBooking: bookingData,
        success: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

module.exports = {
  packageBooking,
  packageBookingUserRead,
  packageBookingAdminRead,
  numberOfBookings,
  singleViewBooking,
  updateBooking,
  newBookings,
  confirmedBookings,
  cancelledBookings,
};
