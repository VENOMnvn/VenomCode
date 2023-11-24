const { raw } = require('body-parser');
const User = require('./../MongoDB/UserSchema');
// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require('cloudinary');
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME, 
  api_key: process.env.CLOUDINARY_CLIENT_API, 
  api_secret:process.env.CLOUDINARY_CLIENT_SECRET_KEY
});


const editprofile = async (req,res)=>{
    try{
        const {profileURL,user} = req.body;
        console.log(req.body);

        if(profileURL){
            const responseByUser = await User.findByIdAndUpdate(user,{profilePicture:profileURL});
            res.send(responseByUser);
            return;
        }

        res.send("OKK");
    }catch(err){
        console.log(err);
        res.send({success:false,msg:err});
    }
};

module.exports = {editprofile}