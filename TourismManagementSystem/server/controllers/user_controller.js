const userSchema = require("../models/user_model");

const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const SECRET_KEY = "Tourism";
const userRegister = async (req, res) => {
  try {
    const { username, email, phone, password, address } = req.body;
    let checkEmail = await userSchema.findOne({ email: email });
    if (checkEmail) {
      console.log("Email already exists");
    } else {
      const salt = await bcrypt.genSalt(10);

      const hashedPassword = await bcrypt.hash(password, salt);

      let newUser = await new userSchema({
        username,
        phone,
        password: hashedPassword,
        email,
        address,
      });
      let savedUser = await newUser.save();
      console.log("Registration successful");
      res.json({
        success: true,
        message: "Registration successful",
        user: savedUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
const userLogin = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    let checkEmail = await userSchema.findOne({ email: email });
    if (!checkEmail) {
      console.log("Email Incorrect");
      res.json({ success: false, message: "Invalid email" });
    } else {
      let checkPassword = await bcrypt.compare(password, checkEmail.password);
      if (!checkPassword) {
        console.log("Invalid Password");
        res.json({
          success: false,
          message: " Invalid password",
        });
      } else {
        let userId = checkEmail.id;
        let token = await jsonwebtoken.sign(userId, SECRET_KEY);
        console.log("Login Successfull");
        res.json({
          success: true,
          message: "Login successfull",
          loggedInUser: checkEmail,
          authToken: token,
        });
      }
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const userRead = async (req, res) => {
  try {
    const userInfo = await userSchema.find();
    res.send(userInfo);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const userUpdate = async (req, res) => {
  try {
    let userData = await userSchema.findById(req.params.id);
    if (!userData) {
      console.log("User not found!");
      return res.status(404).send("Not Found");
    } else {
      const { username, email, phone, password } = req.body;

      const newUser = {};
      if (username) {
        newUser.username = username;
      }
      if (email) {
        newUser.email = email;
      }
      if (phone) {
        newUser.phone = phone;
      }
      if (password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        newUser.password = hashedPassword;
      }

      userData = await userSchema.findByIdAndUpdate(
        req.params.id,
        { $set: newUser },
        { new: true }
      );
      console.log("User profile updated successfully");

      res.json({
        message: "User profile updated successfully",
        updatedUser: userData,
        success: true,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const singleViewUser = async (req, res) => {
  try {
    const userInfo = await userSchema.findById(req.params.id);
    if (!userInfo) {
      return res.status(404).send(" User Not Found");
    } else {
      res.json({
        userInfo: userInfo,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal some error occured");
  }
};

const numberOfRegisteredUsers = async (req, res) => {
  try {
    const userCount = await userSchema.countDocuments();
    res.json({
      success: true,
      message: "users count fetched successfully",
      count: userCount,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error fetching users count");
  }
};

module.exports = {
  userRegister,
  userRead,
  userUpdate,
  userLogin,
  singleViewUser,
  numberOfRegisteredUsers,
};
