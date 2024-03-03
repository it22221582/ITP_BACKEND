import express from "express";

const router = express.Router();

import seller from "../models/seller.js";
import { GeneratehashPassword } from "../Utilities/hashPassword.js";
//to insert/add a seller
// http://localhost:5001/seller/addSeller  -->Post

router.route("/addSeller").post(async (req, res) => {
  try {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const address = req.body.address;
    const postalCode = req.body.postalCode;
    const password = req.body.password;
    const shopID = req.body.shopID;
    const role = "SELLER";

    const hashedPassword = await GeneratehashPassword(password);

    const newSeller = new seller({
      firstName,
      lastName,
      email,
      mobile,
      address,
      postalCode,
      password: hashedPassword,
      shopID,
      role,
    });

    const savedSeller = await newSeller.save();

    console.log("Seller Added:", savedSeller);
    res.status(200).json({
      success: true,
      data: savedSeller,
      message: "Seller added successfully!",
    });
  } catch (err) {
    console.error("Error adding Seller:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err.message || "Internal Server Error",
    });
  }
});

// newSeller
//   .save()
//   .then(() => {
//     res.json("Seller Added");
//     console.log("seller Added");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

//To display sellers //get details of all the sellers
// http://localhost:5001/seller

router.route("/").get(async (req, res) => {
  try {
    const sellerList = await seller.find();
    res.status(200).json({
      success: true,
      data: sellerList,
      message: "Success",
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      data: [],
      message: "Fail",
    });
  }
  // seller
  //   .find()
  //   .then((sellers) => {
  //     res.json(sellers);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});
//To update students
// http://localhost:5001/seller/update/--id--

router.route("/update/:id").put(async (req, res) => {
  try {
    let userid = req.params.id;
    const {
      firstName,
      lastName,
      email,
      mobile,
      address,
      postalCode,
      password,
      shopID,
    } = req.body;

    const updateSeller = {
      firstName,
      lastName,
      email,
      mobile,
      address,
      postalCode,
      password,
      shopID,
    };

    const update = await seller
      .findByIdAndUpdate(userid, updateSeller)
      .then(() => {
        res.status(200).json({
          success: true,
          data: updateSeller,
          message: "seller updated",
        });
      });
  } catch (err) {
    console.error("Error updating the seller:", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
  //To delete seller
  // http://localhost:5001/seller/deleteSeller/--id--

  router.route("/deleteSeller/:id").delete(async (req, res) => {
    let userid = req.params.id;
    try {
      await seller.findByIdAndDelete(userid).then(() => {
        res.status(200).json({
          success: true,
          message: "Seller deleted",
        });
      });
    } catch (err) {
      console.log("Error deleting a seller:", err);
      res.status(500).send({
        success: false,
        status: "Error with deleting the seller",
        message: err,
      });
    }
  });
});

// http://localhost:9000/seller/get/--id--
router.route("/get/:id").get(async (req, res) => {
  let userid = req.params.id;
  try {
    const user = await seller.findById(userid).then((seller) => {
      res.status(200).json({
        success: true,
        message: "Seller fetched",
        data: user,
      });
    });
  } catch (err) {
    console.error("Error getting seller details", err);
    res.status(500).json({
      success: false,
      data: {},
      message: err,
    });
  }
});

export default router;
