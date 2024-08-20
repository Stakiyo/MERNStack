const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "booking",
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "package",
    },

    tId: {
      type: String,
      required: true,
    },
    payment_status: {
      type: String,
      required: true,
    },
    payCheck: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = new mongoose.model("payment", paymentSchema);
