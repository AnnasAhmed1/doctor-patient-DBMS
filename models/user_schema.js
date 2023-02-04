const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  contactNumber: {
    typr: String,
    require: false,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
