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
        default: null
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
        default:"I am a Web Developer and I know HTML CSS JS react and many other front end framework and I also study in JSS college"
    },
    exp:{
        type:Number
    }

},{timestamps:true});

const User = mongoose.model("User",USER);
module.exports = User;
