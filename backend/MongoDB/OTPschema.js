const { model, Schema } = require("mongoose");
const mongoose = require('mongoose');

const OTP = new Schema({
    otp : Number,
    email : String,
    user: String
});

const otp = mongoose.model("otp",OTP);
module.exports = otp;
