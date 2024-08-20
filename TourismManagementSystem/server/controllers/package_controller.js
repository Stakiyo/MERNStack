const packageSchema = require("../models/package_model");

const packageInsert = async (req, res) => {
  try {
    const { pname, ptype, location, details, price, image, features } =
      req.body;

    const packageInfo = new packageSchema({
      pname,
      ptype,
      location,
      details,
      price,
      image,
      features,
    });
    const packageSaved = await packageInfo.save();
    console.log("Package created successfully");
    res.json({
      success: true,
      packageSaved: packageSaved,
      message: "Package created successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const packageRead = async (req, res) => {
  try {
    const packageInfo = await packageSchema.find();
    res.send(packageInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const packageUpdate = async (req, res) => {
  try {
    let packageData = await packageSchema.findById(req.params.id);
    if (!packageData) {
      console.log("Package not found!");
      return res.status(404).send("Not Found");
    } else {
      const { pname, ptype, location, details, price, image, features } =
        req.body;
      const newPackage = {};
      if (pname) {
        newPackage.pname = pname;
      }
      if (ptype) {
        newPackage.ptype = ptype;
      }
      if (price) {
        newPackage.price = price;
      }
      if (location) {
        newPackage.location = location;
      }
      if (details) {
        newPackage.details = details;
      }
      if (features) {
        newPackage.features = features;
      }
      if (image) {
        newPackage.image = image;
      }

      packageData = await packageSchema.findByIdAndUpdate(
        req.params.id,
        { $set: newPackage },
        { new: true }
      );
      console.log("Package updated successfully");
      res.json({
        message: "Package updated successfully",
        updatedPackage: packageData,
        success: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const packageDelete = async (req, res) => {
  let packageInfo = await packageSchema.findById(req.params.id);
  if (!packageInfo) {
    return res.status(404).send("Not Found");
  }
  packageInfo = await packageSchema.findByIdAndDelete(req.params.id);
  res.json({
    success: true,
    packageInfo: packageInfo,
    message: "Package Deleted Successfully",
  });
};

const singleViewPackage = async (req, res) => {
  try {
    const packageInfo = await packageSchema.findById(req.params.id);
    if (!packageInfo) {
      return res.status(404).send("Not Found");
    } else {
      res.json({
        packageInfo: packageInfo,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const getPackageAmount = async (req, res) => {
  try {
    const package = await packageSchema.findOne({ pname: pname });
    if (package) {
      res.json({
        success: true,
        amount: package.amount,
      });
    } else {
      res.status(404).json({ error: "Package not found" });
    }
  } catch (error) {}
};

const numberOfPackages = async (req, res) => {
  try {
    const packageCount = await packageSchema.countDocuments();
    res.json({
      success: true,
      message: "Packages fetched successfully",
      count: packageCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching bookings count");
  }
};

module.exports = {
  packageInsert,
  packageRead,
  packageUpdate,
  packageDelete,
  singleViewPackage,
  getPackageAmount,
  numberOfPackages,
};
