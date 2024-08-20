const adminSchema = require("../models/admin_model");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "Tourism";

const adminRegister = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    let checkEmail = await adminSchema.findOne({ email: email });
    if (checkEmail) {
      console.log("Email already exists");
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      let adminSave = await new adminSchema({
        password: hashedPassword,
        email,
        name,
      });
      let admin = await adminSave.save();
      console.log("Registration successful");
      res.json({
        success: true,
        message: "Registration successful",
        admin: admin,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let checkEmail = await adminSchema.findOne({ email: email });
    if (!checkEmail) {
      console.log("Email Incorrect");
      res.json({ success: false, message: "Invalid email" });
    } else {
      let checkPassword = await bcrypt.compare(password, checkEmail.password);
      if (!checkPassword) {
        console.log("Invaild Password");
        res.json({
          success: false,
          message: " Invalid password",
        });
      } else {
        let adminId = checkEmail.id;
        let token = await jsonwebtoken.sign(adminId, SECRET_KEY);
        console.log("Login Successfull");
        res.json({
          success: true,
          message: "Login successfull",
          loggedInAdmin: checkEmail,
          authToken: token,
        });
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const adminUpdate = async (req, res) => {
  try {
    let adminData = await adminSchema.findById(req.params.id);
    if (!adminData) {
      console.log("Admin not found!");
      return res.status(404).send("Not Found");
    } else {
      const { name, password, email } = req.body;

      const adminUpdate = {};
      if (name) {
        adminUpdate.name = name;
      }
      if (email) {
        adminUpdate.email = email;
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        adminUpdate.password = hashedPassword;
      }

      adminData = await adminSchema.findByIdAndUpdate(
        req.params.id,
        { $set: adminUpdate },
        { new: true }
      );
      console.log("Admin profile updated successfully");
      res.json({
        message: "Admin profile updated successfully",
        updatedAdmin: adminData,
        success: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};
const singleViewAdmin = async (req, res) => {
  try {
    const adminInfo = await adminSchema.findById(req.params.id);
    if (!adminInfo) {
      return res.status(404).send(" Admin Not Found");
    } else {
      res.json({
        adminInfo: adminInfo,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

module.exports = { adminRegister, adminLogin, adminUpdate, singleViewAdmin };
