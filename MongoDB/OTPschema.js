const { model, Schema } = require("mongoose");
const mongoose = require('mongoose');


const OTPSchema = new Schema({
    otp : Number,
    email : String
},{
    timestamps:true
});

const OTP = mongoose.model("otp",OTPSchema);
module.exports = OTP;
