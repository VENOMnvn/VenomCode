const { model, Schema, Model } = require("mongoose");
const DIRECT = new Schema({
    to:Array,
    msg:String,
    username:String,
    profilePicture:String
},{
    timestamps:true
});
const Direct = new model("Direct",DIRECT);
module.exports = Direct;