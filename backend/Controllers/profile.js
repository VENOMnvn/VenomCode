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
const getUserDetails = async (req,res)=>{
    console.log(req.body);
    try{
        const {username,userid} = req.body;
        if(username){
            let user = await User.findOne({username}).populate('POSTS');
            console.log(user);
            if(user){
                user.password = "Hidden";
                user._id = "Hidden";
                res.send({
                    success:true,
                    user:user
                });

            }else{
                res.send({msg:"User Not Found"});
            }
            
        }else if(userid){
            let user = await User.findById(userid).populate({path:'posts'});
            if(user){
                user.password = "Hidden";

                res.send({
                    success:true,
                    user:user
                });

            }else{
                res.send({msg:"User Not Found"});
            }
        }
        else{
            res.send("Send Parameters");
        }

    }catch(err){
        console.log(err);
        res.send({err});
    }
}

const getUserQuery = async (req,res)=>{
    const {query} = req.query;
    console.log(query);
    try{
        let users = await User.find({$or:[{firstname:{$regex:new RegExp(query, "i")}},{username:{$regex:new RegExp(query, "i")}}]}).select('username firstname lastname profilePicture city designation -_id');
        res.send({users});

    }catch(err){
        console.log(err)
    }
};

module.exports = {editprofile,getUserDetails,getUserQuery};