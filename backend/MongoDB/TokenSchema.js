const { model, Schema } = require("mongoose");
const mongoose = require('mongoose');

const token = new Schema({
    token:{
        type:String
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,ref:"User"
    },
    email:{
        type:String
    },
    password:String,
    isVerified:{
        type:Boolean,
        default:false
    }
    
},{timestamps:true});

const Token = model('token',token);
module.exports = Token;