const { model, Schema, Model } = require("mongoose");
const mongoose = require('mongoose');

const CONVERSATION = new Schema({
    users:{
        type:[{type:mongoose.SchemaTypes.ObjectId,ref:"User"}],
        require:true
    },
    messages:{
        type:[{type:mongoose.SchemaTypes.ObjectId,ref:"Message"}]
    },
    lastMessage:{
        type:Object,
        ref:"Message",
    }
},{
    timestamps:true
});
const Conversation = new model("Conversation",CONVERSATION);
module.exports = Conversation;