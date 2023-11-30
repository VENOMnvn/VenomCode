const { model, Schema } = require("mongoose");

const CONVERSATION = new Schema({
    users:{
        type:Array,
        require:true
    },
    messages:{
        type:Array
    },
    
})