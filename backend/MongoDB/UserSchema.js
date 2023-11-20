const { model, Schema } = require("mongoose");
const mongoose = require('mongoose');

const USER = new Schema ({
    
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    birthdate: {
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
    }

},{timestamps:true});

const User = mongoose.model("User",USER);
module.exports = User;
