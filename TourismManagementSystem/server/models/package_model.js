const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema(
  {
    pname: {
      type: String,
      required: true,
    },
    ptype: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("package", packageSchema);
