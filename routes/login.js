import express from "express";

import generateToken from "../Utilities/jwtToken.js";
import { GeneratehashPassword } from "../Utilities/hashPassword.js";
import customer from "../models/customer.js";
import seller from "../models/seller.js";
import admin from "../models/admin.js";

const router = express.Router();

//http://localhost:5001/login/Customerlogin
router.route("/Customerlogin").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await GeneratehashPassword(password);
    console.log(hashedPassword);

    const selectedCustomer = await customer.findOne({
      email,
      password,
    });

    if (selectedCustomer) {
      const token = GeneratehashPassword(selectedCustomer);

      res.status(200).json({
        success: true,
        data: selectedCustomer,
        message: "Login success",
        token: token,
      });
    } else {
      res.status(200).json({
        success: false,
        data: {},
        message: "Login failed!",
        token: "",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: error,
      token: "",
    });
  }
  // try {

  //   if (selectedCustomer) {
  //     const token = GeneratehashPassword(selectedCustomer);

  //     res.status(200).json({
  //       success: true,
  //       data: selectedCustomer,
  //       message: "Login success",
  //       token: token,
  //     });
  //   } else {
  //     res.status(200).json({
  //       success: false,
  //       data: {},
  //       message: "Login failed!",
  //       token: "",
  //     });
  //   }
  // } catch (error) {
  //   res.status(500).json({
  //     success: false,
  //     data: {},
  //     message: error,
  //     token: "",
  //   });
  // }
});

//http://localhost:5001/login/Sellerlogin
router.route("/Sellerlogin").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    console.log("hashedpassword");
    const selectedSeller = await seller.findOne({
      email: email,
      password: hashedPassword,
    });
    if (selectedSeller) {
      const token = generateToken(selectedSeller);

      res.status(200).json({
        success: true,
        data: selectedSeller,
        message: "Login success",
        token: token,
      });
    } else {
      res.status(200).json({
        success: false,
        data: {},
        message: "Login failed!",
        token: "",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: error,
      token: "",
    });
  }
});

//http://localhost:5001/login/Adminlogin
router.route("/Adminlogin").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await hashPassword(password);
    console.log(hashedPassword);
    console.log("hashedpassword");
    const selectedAdmin = await admin.findOne({
      email: email,
      password: hashedPassword,
    });
    if (selectedAdmin) {
      const token = generateToken(selectedAdmin);

      res.status(200).json({
        success: true,
        data: selectedAdmin,
        message: "Login success",
        token: token,
      });
    } else {
      res.status(200).json({
        success: false,
        data: {},
        message: "Login failed!",
        token: "",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      message: error,
      token: "",
    });
  }
});

export default router;
