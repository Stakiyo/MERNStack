const enquirySchema = require("../models/enquiry_model");

const enquiryCreate = async (req, res) => {
  try {
    const { name, email, mobile, subject, description } = req.body;

    const enquiryInfo = new enquirySchema({
      name,
      email,
      mobile,
      subject,
      description,
      e_status: "Pending",
    });
    const e_email = enquirySchema.findOne({ email: email });
    const e_mobile = enquirySchema.findOne({ mobile: mobile });
    if (e_email) {
      console.log("Email already exists");
    } else if (e_mobile) {
      console.log("Mobile already exists");
    } else {
      const enquirySaved = await enquiryInfo.save();
      console.log("Enquiry submitted successfully");
      res.json({
        success: true,
        message: "Enquiry submitted successfully",
        enquiry: enquirySaved,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const enquiryRead = async (req, res) => {
  try {
    const enquiryInfo = await enquirySchema.find();
    res.send(enquiryInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const enquiryDelete = async (req, res) => {
  let enquiryInfo = await enquirySchema.findById(req.params.id);
  if (!enquiryInfo) {
    return res.status(404).send("Not Found");
  }
  enquiryInfo = await enquirySchema.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
    enquiryInfo: enquiryInfo,
    message: "Enquiry Deleted Successfully",
  });
};

const numberOfEnquiries = async (req, res) => {
  try {
    const enquiriesCount = await enquirySchema.countDocuments();
    res.json({
      success: true,
      message: "enquiries fetched successfully",
      count: enquiriesCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching enquiries count");
  }
};
const readEnquiries = async (req, res) => {
  try {
    const readEnquiriesCount = await enquirySchema.countDocuments({
      e_status: "Read",
    });
    res.json({
      success: true,
      message: "enquiries fetched successfully",
      count: readEnquiriesCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching enquiries count");
  }
};
const newEnquiries = async (req, res) => {
  try {
    const newEnquiriesCount = await enquirySchema.countDocuments({
      e_status: "Pending",
    });
    res.json({
      success: true,

      count: newEnquiriesCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching enquiries count");
  }
};

const updateEnquiry = async (req, res) => {
  try {
    let enquiryData = await enquirySchema.findById(req.params.id);
    if (!enquiryData) {
      console.log("Enquiry details not found!");
      return res.status(404).send("Not Found");
    } else {
      const { e_status } = req.body;
      const newEnquiry = {};
      if (e_status) {
        newEnquiry.e_status = e_status;
      }

      enquiryData = await enquirySchema.findByIdAndUpdate(
        req.params.id,
        { $set: newEnquiry },
        { new: true }
      );
      console.log("Enquiry updated successfully");
      res.json({
        message: "Enquiry updated successfully",
        updatedEnquiry: enquiryData,
        success: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

module.exports = {
  enquiryCreate,
  enquiryRead,
  enquiryDelete,
  numberOfEnquiries,
  updateEnquiry,
  readEnquiries,
  newEnquiries,
};
