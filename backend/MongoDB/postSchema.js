const { model, Schema } = require("mongoose");
const mongoose = require('mongoose');

const postS = new Schema ({
    user:{
      type:Object
    },
    postCode:{
        type:String
    },
    title:{
        type:String
    },
    label:{
        type:Array
    },
    likes:{
        type:Array
    },
    comments:{
        type:Array
    }
},{timestamps:true});

const POSTS = mongoose.model("POSTS",postS);
module.exports = POSTS;
