const user = require("../MongoDB/UserSchema");
const ProfessionModel = require('../MongoDB/professionSchema');

const filterFunction = async (req,res)=>{
     
     console.log(req.body);
     const {location,Category} = req.body;

     try{

         console.log(location,Category);
         const result = await ProfessionModel.find({Category:Category.toLowerCase(),Location:location.toLowerCase()}).populate("userid");
         console.log(result);
         res.send({
         result
         });
       
     }
     catch(err){
      console.log(err);
        res.send({
            err,
            result:"Error occured"
        })
     }    
}

module.exports = filterFunction;