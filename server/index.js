const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/User");
const categoryRoute = require("./routes/Category");
const transactionRoute = require("./routes/Transaction");

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

dotenv.config();

const app = express();
app.use(cors(corsOptions));

const port = 8080;
const mongoDbUrl = process.env.MONGODB_URI;

// routes direction

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/transaction", transactionRoute);

//Connecting to MongoDb

async function connectDb() {
  try {
    await mongoose.connect(mongoDbUrl);
  } catch (error) {
    console.log("connection error", error);
  }
}

connectDb();

app.listen(port, () => {
  console.log(`Db is connected and App is listening to port ${port}`);
});
