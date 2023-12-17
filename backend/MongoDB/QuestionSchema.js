const { model, Schema, Model } = require("mongoose");
const mongoose = require('mongoose');

const PROBLEMS = new Schema({
   title:String,
   description:String,
   tags:Array,
   link:String,
   user:Object,
   id:String,
   solutions:[{type:mongoose.SchemaTypes.ObjectId,ref:"POSTS"}]
},{
    timestamps:true
});
const Problem = new model("problems",PROBLEMS);
module.exports = Problem;