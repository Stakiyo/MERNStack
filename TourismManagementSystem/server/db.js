const mongoose = require("mongoose");

const URI = "mongodb://localhost:27017/tourism";

const dbConnection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Database Connection is Successfull");
  } catch (err) {
    console.log(err);
  }
};

module.exports = { dbConnection };
