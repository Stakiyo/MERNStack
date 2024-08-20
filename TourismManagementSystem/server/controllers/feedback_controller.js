const feedbackSchema = require("../models/feedback_model");

const feedbackCreate = async (req, res) => {
  try {
    const { name, email, phone, suggestion } = req.body;
    const feedbackInfo = new feedbackSchema({
      name,
      email,
      phone,
      suggestion,
    });
    const checkEmail = await feedbackSchema.findOne({ email: email });
    const checkPhone = await feedbackSchema.findOne({ phone: phone });
    if (checkEmail) {
      console.log("Email already exists");
    } else if (checkPhone) {
      console.log("Mobile already exists");
    } else {
      const feedbackSaved = await feedbackInfo.save();
      console.log("Feedback sent successfully");
      res.json({
        success: true,
        feedbackSaved: feedbackSaved,
        message: "Feedback sent successfully",
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const feedbackRead = async (req, res) => {
  try {
    const feedbackInfo = await feedbackSchema.find();
    res.send(feedbackInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const feedbackDelete = async (req, res) => {
  let feedbackInfo = await feedbackSchema.findById(req.params.id);
  if (!feedbackInfo) {
    return res.status(404).send("Not Found");
  }
  feedbackInfo = await feedbackSchema.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
    feedbackInfo: feedbackInfo,
    message: "Feedback Deleted Successfully",
  });
};

module.exports = { feedbackCreate, feedbackRead, feedbackDelete };
