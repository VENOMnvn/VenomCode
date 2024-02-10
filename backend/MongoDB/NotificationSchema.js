const { model, Schema, Model } = require("mongoose");

const NOTIFICATION = new Schema({
    user:{
        type:String
    },

    msg:String,
    username:String,
    profilePicture:String,
    link:String,
    extra:String,
    isSeen:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const Notification = new model("Notification",NOTIFICATION);
module.exports = Notification;