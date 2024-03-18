import express from "express";

import { generateToken } from "../Utilities/jwtToken.js";
import { GeneratehashPassword } from "../Utilities/hashPassword.js";
import { comparePasswords } from "../Utilities/hashPassword.js";

import customer from "../models/customer.js";
import seller from "../models/seller.js";
import admin from "../models/admin.js";

const router = express.Router();

//http://localhost:5001/login/Customerlogin
router.route("/Customerlogin").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    const selectedCustomer = await customer.findOne({
      email,
    });
    console.log(selectedCustomer);

    if (true) {
      console.log("in selected customer");
      const isPasswordMatch = await comparePasswords(
        password,
        selectedCustomer.password
      );
      console.log("is password match : ", isPasswordMatch);
      if (isPasswordMatch) {
        const token = generateToken(selectedCustomer);
        console.log(token);

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
          message: "Login failed.Incorrect Password",
          token: " ",
        });
      }
    } else {
      res.status(200).json({
        success: false,
        data: {},
        message: "Login failed.Customer does not exist!",
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

//http://localhost:5001/login/Sellerlogin
router.route("/Sellerlogin").post(async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    const selectedSeller = await seller.findOne({
      email,
    });
    console.log(selectedSeller);

    if (true) {
      const isPasswordMatch = await comparePasswords(
        password,
        selectedSeller.password
      );
      if (isPasswordMatch) {
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

    console.log(email, password);

    const selectedAdmin = await admin.findOne({
      email,
    });
    console.log(selectedAdmin);

    if (true) {
      const isPasswordMatch = await comparePasswords(
        password,
        selectedAdmin.password
      );
      if (isPasswordMatch) {
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
