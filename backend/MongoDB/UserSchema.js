const { model, Schema } = require("mongoose");
const mongoose = require('mongoose');

const USER = new Schema ({
    
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    organisation:String,
    designation:String,
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    profilePicture: {
        type: String,
        default: "http://res.cloudinary.com/dcnvvzsdh/image/upload/v1700839981/venomcode/uh0p4n8yozlo0ptha5ht.png"
    },
    skills: {
        type: [String]
    },
    likedPost: {
        type: [String]
    },
    following: {
        type: Array,
    },
    followers: {
        type: [String],
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    bio:{
        type:String,
        default:"I am a Web Developer and I know HTML CSS JS react and many other front end framework"
    },
    exp:{
        type:Number,
        default:0
    }

},{timestamps:true});

const User = mongoose.model("User",USER);
module.exports = User;
