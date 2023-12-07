const { model, Schema, Model } = require("mongoose");

const CONVERSATION = new Schema({
    users:{
        type:[String],
        require:true
    },
    messages:{
        type:[{type:mongoose.SchemaTypes.ObjectId,ref:"Message"}]
    },
    lastMessage:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"Message"
    }
    
});
const Conversation = new model("Conversation",CONVERSATION);
export default Conversation;