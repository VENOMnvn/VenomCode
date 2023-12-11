const Notification = require("../MongoDB/NotificationSchema");
const User = require("./../MongoDB/UserSchema");
// import {v2 as cloudinary} from 'cloudinary';
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET_KEY,
});

const editprofile = async (req, res) => {
  try {
    const {
      profileURL,
      user,
      exp,
      designation,
      bio,
      city,
      organisation,
      skills,
    } = req.body;
    console.log(
      profileURL,
      user,
      exp,
      designation,
      bio,
      city,
      organisation,
      skills
    );
    const responseByUser = await User.findByIdAndUpdate(user, {
      profilePicture: profileURL,
      exp,
      designation,
      bio,
      city,
      organisation,
      skills,
    });
    res.send(responseByUser);
    return;
  } catch (err) {
    console.log(err);
    res.send({ success: false, msg: err });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const { userid, username, visitor } = req.body;

    if (userid) {
      let user = await User.findById(userid)
        .populate({ path: "posts" })
        .populate({ path: "savedpost" });

      if (user) {
        user.password = "Hidden";

        res.send({
          success: true,
          user: user,
        });
      } else {
        res.send({ msg: "User Not Found" });
      }
    } else if (username) {
      let user = await User.findOne({ username })
        .populate({ path: "posts" })
        .select("-password -_id");
      const isFollower = user.followers.includes(visitor);

      user = {
        ...user._doc,
        isFollower,
      };

      res.send({
        success: true,
        user,
      });
    } else {
      res.send("Send Parameters");
    }
  } catch (err) {
    console.log(err);
    res.send({ err });
  }
};

const getUserQuery = async (req, res) => {
  const { query, username, limit, skip } = req.query;
  try {
    if (limit) {
      let users = await User.find()
        .limit(limit)
        .select(
          "username profilePicture firstname lastname designation city -_id"
        );
      res.send({ users });
      return;
    }

    if (username) {
      let user = await User.findOne({ username }).select(
        "username profilePicture firstname lastname designation city -_id"
      );
      res.send({ success: true, user });
      return;
    }

    let users = await User.find({
      $or: [
        { firstname: { $regex: new RegExp(query, "i") } },
        { username: { $regex: new RegExp(query, "i") } },
      ],
    }).select(
      "username firstname lastname profilePicture city designation -_id"
    );
    res.send({ users });
  } catch (err) {
    console.log(err);
  }
};

const addFollower = async (req, res) => {
  try {
    
    const { followingId, followerId } = req.body;
    
    if(followingId == followerId){
      res.send("You cant follow yourself");
    }

    const responseByUser = await User.findOneAndUpdate(
      { username: followingId },
      { $push: { followers: followerId } }
    );
    const UserDB = await User.findOneAndUpdate(
      { username: followerId },
      { $push: { following: followingId } }
    );

    await Notification.create({
      user: responseByUser._id,
      msg: "starts following you",
      username: followerId,
      profilePicture: UserDB.profilePicture,
      link:"/user/"+followerId
    });

    res.send({
      success: true,
    });
  } catch (err) {}
};


const removeFollower = async (req,res)=>{
  try{
    
    const {username,userId,FollowUsername} = req.body;
    await User.findByIdAndUpdate(userId,{$pull:{following:username}});
    await User.findOneAndUpdate({username},{$pull:{followers:FollowUsername}});
    res.send({
      success:true
    })

  }catch(err){
    console.log(err);
  }
}

const getFollower = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  editprofile,
  getUserDetails,
  getUserQuery,
  addFollower,
  getFollower,
  removeFollower
};
