import express from "express";
import { GeneratehashPassword } from "../Utilities/hashPassword.js";
const router = express.Router();

import customer from "../models/customer.js";

//to insert/add a customer
// http://localhost:5001/customer/addCustomer  -->Post

router.route("/addCustomer").post(async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const province = req.body.province;
  const district = req.body.district;
  const postalCode = req.body.postalCode;
  const password = req.body.password;
  const role = "CUSTOMER";

  const hashedPassword = await GeneratehashPassword(password);

  try {
    const newCustomer = new customer({
      firstName,
      lastName,
      email,
      mobile,
      address,
      province,
      district,
      postalCode,
      password: hashedPassword,
      role,
    });

    const savedCustomer = await newCustomer.save();

    console.log("Customer Added:", savedCustomer);
    res.status(200).json({
      success: true,
      data: savedCustomer,
      message: "Customer added successfully!",
    });
  } catch (err) {
    console.error("Error adding customer:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});
//To display customers //get details of all the customers
// http://localhost:5001/customer/

router.route("/").get(async (req, res) => {
  try {
    const customerList = await customer.find();
    res.status(200).json({
      success: true,
      data: customerList,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      data: [],
      message: "Fail",
    });
  }

  // customer
  //   .find()
  //   .then((customers) => {
  //     res.json(customers);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});
//To update customers
// http://localhost:5001/customer/update/--id--

router.route("/update/:id").put(async (req, res) => {
  try {
    let userid = req.params.id;
    const {
      firstName,
      lastName,
      email,
      mobile,
      address,
      province,
      district,
      postalCode,
      password,
    } = req.body;

    const updateCustomer = {
      firstName,
      lastName,
      email,
      mobile,
      address,
      province,
      district,
      postalCode,
      password,
    };

    const update = await customer
      .findByIdAndUpdate(userid, updateCustomer)
      .then(() => {
        res.status(200).json({
          success: true,
          data: updateCustomer,
          message: "customer updated",
        });
      });
  } catch (err) {
    console.error("Error updating the customer:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});

//To delete customer
// http://localhost:5001/customer/deleteCustomer/--id--

router.route("/deleteCustomer/:id").delete(async (req, res) => {
  let userid = req.params.id;
  try {
    await customer.findByIdAndDelete(userid).then(() => {
      res.status(200).json({
        success: true,
        message: "Customer deleted",
      });
    });
  } catch (err) {
    console.log("Error deleting a customer:", err);
    res.status(500).send({
      success: false,
      status: "Error with deleting the customer",
      message: err,
    });
  }
});

// http://localhost:5001/customer/get/--id--
router.route("/get/:id").get(async (req, res) => {
  let userid = req.params.id;
  try {
    const user = await customer.findById(userid).then((customer) => {
      res.status(200).json({
        success: true,
        message: "Customer fetched",
        data: user,
      });
    });
  } catch (err) {
    console.error("Error getting customer details", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});

export default router;
