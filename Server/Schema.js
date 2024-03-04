const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    userPass: String,
  },
  { collection: "userCredentials" }
);

mongoose.model("userCredentials", userSchema);
