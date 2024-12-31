const { model, Schema } = require("mongoose");
const mongoose = require('mongoose');



const PROFESSION = new Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    Occupation : String,
    name:String,
    Category : String,
    Experience : Array,
    Salary : Number,
    Details : String,
    Education: String,
    BarNumber : Number,
    DateOfPractice : Date,
    Badges : String,
    Tag: Array,
    Location:{
        type:String
    },
    NoOfCase: Number,
    IsLegalAdvisor : Boolean,
    RateOfAdvise  : Number,
    ContactNumber : Number,
    History : Array,
    adharNo : Number,
    panNo: Number,
    licenseNo: Number,
    barCouncilNo: Number,
    officeAddress: String,
    specilization:String,
    adharImage : {
        type : Object,
        default:{
            public_id :"",
            url : ""
        }
    },
    panImage : {
        type : Object,
        default:{
            public_id :"",
            url : ""
        }
    },
    licenseImage :{
        type : Object,
        default:{
            public_id :"",
            url : ""
        }
    },
    certificateImage : {
        type : Object,
        default:{
            public_id :"",
            url : ""
        }
    }
})

const ProfessionModel = mongoose.model("proffesions",PROFESSION);
module.exports = ProfessionModel;