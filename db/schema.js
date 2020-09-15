const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const userSchema = new Schema({
  phoneNumber: String,
  profile: String,
  otp: Number,
  name: String,
});

const userModel = Mongoose.model("userProfile", userSchema);

module.exports = {
  userModel,
};
