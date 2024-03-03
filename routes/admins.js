import express from "express";

const router = express.Router();

import admin from "../models/admin.js";

//to insert/add a admin
// http://localhost:5001/admin/addAdmin  -->Post

router.route("/addAdmin").post(async (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const password = req.body.password;
  const role = "ADMIN";
  try {
    const newAdmin = new admin({
      firstName,
      lastName,
      email,
      mobile,
      password,
      role,
    });

    const savedAdmin = await newAdmin.save();
    console.log("Admin Added: ", savedAdmin);
    res.status(200).json({
      success: true,
      data: savedAdmin,
      message: "Admin added successfully!",
    });
  } catch (err) {
    console.error("Error adding admin:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});
//To display admins //get details of all the admins
// http://localhost:5001/admin

router.route("/").get(async (req, res) => {
  try {
    const adminList = await admin.find();
    res.status(200).json({
      success: true,
      data: adminList,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      data: [],
      message: "Fail",
    });
  }
});
//To update admins
// http://localhost:5001/admin/update/--id--

router.route("/update/:id").put(async (req, res) => {
  try {
    let userid = req.params.id;
    const { firstName, lastName, email, mobile, password } = req.body;

    const updateAdmin = {
      firstName,
      lastName,
      email,
      mobile,
      password,
    };

    const update = await admin
      .findByIdAndUpdate(userid, updateAdmin)
      .then(() => {
        res.status(200).json({
          success: true,
          data: updateAdmin,
          message: "admin updated",
        });
      });
  } catch (err) {
    console.error("Error updating admin:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});
//To delete admin
// http://localhost:5001/admin/deleteAdmin/--id--

router.route("/deleteAdmin/:id").delete(async (req, res) => {
  let userid = req.params.id;
  try {
    await admin.findByIdAndDelete(userid).then(() => {
      res.status(200).json({
        success: true,
        message: "admin deleted",
      });
    });
  } catch (err) {
    console.log("Error deleting a admin:", err);
    res.status(500).send({
      success: false,
      status: "Error with deleting the admin",
      message: err,
    });
  }
});
// http://localhost:5001/admin/get/--id--
router.route("/get/:id").get(async (req, res) => {
  let userid = req.params.id;
  try {
    const user = await admin.findById(userid).then((admin) => {
      res.status(200).json({
        success: true,
        message: "Admin fetched",
        data: user,
      });
    });
  } catch (err) {
    console.error("Error getting admin details", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});

export default router;
