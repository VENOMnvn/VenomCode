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
    posts:{
        type:[{type:mongoose.SchemaTypes.ObjectId,ref:"POSTS"}]
    },
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
        default: "http://res.cloudinary.com/dcnvvzsdh/image/upload/v1701096607/venomcode/ay07lxp5mxbsiciluo2m.jpg"
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
