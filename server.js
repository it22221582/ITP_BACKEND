import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import SellerRouter from "./routes/sellers.js";
import CustomerRouter from "./routes/customers.js";
import AdminRouter from "./routes/admins.js";
import LoginRouter from "./routes/login.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

/*Mongoose Setup */
const PORT = process.env.PORT || 9000;
const URL = process.env.MONGO_URL;

mongoose
  .connect(URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb Connection Success!");
});

//localhost:5001/seller
app.use("/seller", SellerRouter);

//localhost:5001/admin
app.use("/admin", AdminRouter);

//localhost:5001/customer
app.use("/customer", CustomerRouter);

app.use("/login", LoginRouter);

const schemaData = mongoose.Schema;
