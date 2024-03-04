const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const { MONGO_URI, ADMIN_PASS, JWT_KEY } = require("./Constants");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("./Schema");

app.use(express.json());
app.use(cors());

app.listen("5050", () => {
  console.log("Server Running.....");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connection Established");
  })
  .catch((e) => {
    console.log(e, "Error");
  });

const userData = mongoose.model("userCredentials");
const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send({ message: "Welcome" });
});

app.post("/login", async (req, res) => {
  const { userName, userPass, userType } = req.body;
  if (userType === "admin") {
    const { userKey } = req.body;
    if (userKey != ADMIN_PASS) {
      return res.json({ status: "Invalid Admin!" });
    }
  }
  const userDetails = await userData.findOne({ userName });
  if (userDetails && userPass != userDetails.userPass) {
    return res.json({ status: "Invalid User!" });
  }

  try {
    await userData.create({
      userName,
      userPass,
    });
    const token = jwt.sign({ name: userName }, JWT_KEY, {
      expiresIn: 300,
    });
    res.send({ status: "OK", data: token, userType: userType });
  } catch (e) {
    res.send({ status: "Unknown Error", err: e });
  }
});

app.get("/allUsers", async (req, res) => {
  const userDetails = await userData.find({});
  if (!userDetails) {
    return res.json({ status: "noRecords" });
  }
  try {
    res.send({ status: "OK", data: userDetails });
  } catch (e) {
    res.send({ status: "Unknown Error", err: e });
  }
});

app.post("/userDetails", async (req, res) => {
  const data = jwt.verify(req.body.token, JWT_KEY);
  if (!data) {
    return res.json({ status: "Invalid Token" });
  }
  const userDetails = await userData.findOne({ userName: data.name });
  if (!userDetails) {
    return res.json({ status: "noRecords" });
  }
  try {
    res.send({ status: "OK", data: userDetails });
  } catch (e) {
    res.send({ status: "Unknown Error", err: e });
  }
});

app.post("/uploadDoc", async (req, res) => {
  const data = jwt.verify(req.body.token, JWT_KEY);
  if (!data) {
    return res.json({ status: "Invalid Token" });
  }
  const userDetails = await userData.findOne({ userName: data.name });
  if (!userDetails) {
    return res.json({ status: "noRecords" });
  }
  try {
    userData
      .updateOne(
        { userName: data.name }, // Match condition
        { $push: { userDocuments: req.body.file } } // Update operation
      )
      .then((data) => {
        console.log("Update Sucess", data);
      })
      .catch((e) => {
        console.log("Update Failed");
      });

    const updatedUser = await userData.findOne({ userName: data.name });
    res.json({ status: "OK", data: updatedUser });
  } catch (e) {
    res.json({ status: "Unknown Error", err: e });
  }
});
