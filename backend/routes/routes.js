const { userRegisteration,userSignin,getUserName,addExperience,profileComplete} = require("../Controllers/userRegisteration");
const {userLogin,resetPassword, resetLogin,googlesignin} = require("../Controllers/userLogin");
const filterFunction = require("../Controllers/filter");
const {editprofile,getUserDetails,getUserQuery, addFollower,removeFollower,getFollower} = require("./../Controllers/profile");
const {sharePost,getPosts,addLike,postFilter,setComment,getPost, savePost}  = require("./../Controllers/post");
const {sendMessage,getConversations,getChat,deleteMessage}= require('../Controllers/Chat');

const express = require("express");
const { getNotification,checknotification, seenNotification} = require("../Controllers/Notification");
const router = express.Router();


//User Registration
router.post("/register", userRegisteration);
router.post('/signin',userSignin);
router.get('/getusername',getUserName);
router.post("/addExperience", addExperience);
router.post("/proffesionalData", profileComplete);


//Login
router.post("/login", userLogin);
router.post('/resetpassword',resetPassword);
router.get('/resetlogin',resetLogin);
router.post("/signingoogle",googlesignin);

//Filter
router.post("/filter", filterFunction);

//Post
router.post('/postfilter',postFilter);
router.post("/sharepost",sharePost);
router.get('/posts',getPosts);
router.post('/getpost',getPost);
router.post('/addlike',addLike);
router.post('/comment',setComment);
router.post('/savepost',savePost);

//Profile
router.post('/editprofile',editprofile);
router.post('/getuserdetails',getUserDetails);
router.get('/getUser',getUserQuery);
router.post('/addfollower',addFollower)
router.post('/removefollower',removeFollower);
router.post('/getfollowers',getFollower);

//Chat
router.post('/getchat',getChat);
router.get('/conversation',getConversations);
router.post('/message',sendMessage);

//notification 
router.post('/notifications',getNotification);
router.get('/seennotification',seenNotification);
router.get('/checknotification',checknotification);

module.exports = router;
