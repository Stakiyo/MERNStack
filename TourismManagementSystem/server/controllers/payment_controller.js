const paymentSchema = require("../models/payment_model");

const createPayment = async (req, res) => {
  try {
    const {
      package_id,
      booking_id,
      tId,
      customer_id,
      payCheck,
      payment_status = "Pending",
    } = req.body;
    let transactionId = await paymentSchema.findOne({ tId: tId });
    if (transactionId) {
      console.log("Transaction Id already exists");
    } else {
      let paymentSave = await new paymentSchema({
        tId,
        booking_id: booking_id,
        customer_id: customer_id,
        package_id: package_id,
        payment_status: payment_status,
        payCheck: payCheck,
      });
      let payment = await paymentSave.save();
      console.log("Payment Successful");
      res.json({
        success: true,
        message: "Payment Successful",
        payment: payment,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const readPayment = async (req, res) => {
  try {
    const paymentInfo = await paymentSchema
      .find()
      .populate("booking_id")
      .populate("package_id")
      .populate("customer_id");
    console.log(paymentInfo);
    res.send(paymentInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const singlePayment = async (req, res) => {
  try {
    const paymentInfo = await paymentSchema.findById(req.params.id);
    if (!paymentInfo) {
      return res.status(404).send("Payment details not found");
    } else {
      res.json({
        paymentInfo: paymentInfo,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const singleBookingPayment = async (req, res) => {
  try {
    const { id } = req.body;

    const paymentInfo = await paymentSchema.find({
      booking_id: id,
    });
    if (!paymentInfo) {
      return res.status(404).send("Payment details not found");
    } else {
      res.json({
        paymentStatus: paymentInfo,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const updatePayment = async (req, res) => {
  try {
    let paymentData = await paymentSchema.find({
      booking_id: req.params.id,
    });
    if (!paymentData) {
      console.log("Payment details not found!");
      return res.status(404).send("Not Found");
    } else {
      const { payment_status } = req.body;
      const newPayment = {};
      if (payment_status) {
        newPayment.payment_status = payment_status;
      }

      paymentData = await paymentSchema.findByIdAndUpdate(
        req.params.id,
        { $set: newPayment },
        { new: true }
      );
      console.log("Payment updated successfully");
      res.json({
        message: "Payment updated successfully",
        updatedPayment: paymentData,
        success: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const numberOfPayments = async (req, res) => {
  try {
    const paymentCount = await paymentSchema.countDocuments();
    res.json({
      success: true,
      message: "Payment count fetched successfully",
      count: paymentCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching bookings count");
  }
};

module.exports = {
  createPayment,
  readPayment,
  singlePayment,
  singleBookingPayment,
  updatePayment,
  numberOfPayments,
};
