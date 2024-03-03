import mongoose from "mongoose";

const Schema = mongoose.Schema;

const sellerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  shopID: {
    type: String,
    required: false,
    default: "",
  },
  role: {
    type: String,
    required: true,
    default: "SELLER",
  },
});

const seller = mongoose.model("seller", sellerSchema);

//module.exports = seller;

export default seller;

// {
//   _id:"dshbdksydbilsb"
//   name:"Dinisuru",
//   mobile:123456,
//   shopID:"123458522989",

// }

// {
//   _id:"123458522989"
//   shopname:"abc",

// }

// {
//   _id:"852",
//   proname:"soap",
//   shopid:"123458522989",
//   sih:70
// }

// //admin
// fname
// lname
// password
// email
// mobile
// role =ADMIN

// //customer
// fname
// lname
// password
// email
// mobile
// address
// province
// distrit
// postalcode
// role =CUSTOMER

// //seller
// fname
// lname
// password
// email
// mobile
// adress
// role =SELLER
// shopid

//git
//jwt  localstorage, sessionstorage, cookies
//authentication andauthorization
