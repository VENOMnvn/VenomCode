const { userRegisteration,userSignin,getUserName,addExperience} = require("../Controllers/userRegisteration");
const {userLogin,resetPassword, resetLogin,googlesignin,googlesigninUsername} = require("../Controllers/userLogin");
const filterFunction = require("../Controllers/filter");
const {editprofile,getUserDetails,getUserQuery, addFollower,removeFollower,getFollower} = require("./../Controllers/profile");
const {sharePost,getPosts,addLike,postFilter,setComment,getPost, savePost, unsavepost, PostLength}  = require("./../Controllers/post");
const {sendMessage,getConversations,getChat,deleteMessage}= require('../Controllers/Chat');
const {getProblem,getProblems,getUserProblems,CreateProblem, getProblemswithTag, getProblemsCount} = require('../Controllers/problems');
const { getNotification,checknotification, seenNotification} = require("../Controllers/notification");
const express = require("express");
const { auth } = require("../middleware/auth");
const router = express.Router();


//User Registration
router.post("/register", userRegisteration);
router.post('/signin',userSignin);
router.get('/getusername',getUserName);
router.post("/addExperience", addExperience);


//Login
router.post("/login", userLogin);
router.post('/resetpassword',resetPassword);
router.get('/resetlogin',resetLogin);
router.post("/signingoogle",googlesignin);
router.post('/usergoogle',googlesigninUsername);


//Filter
router.post("/filter", filterFunction);

//Post
router.post('/postfilter',postFilter);

router.post("/sharepost",sharePost);
router.get('/postlength',PostLength);
router.get('/posts',getPosts);
router.post('/getpost',getPost);
router.post('/addlike',auth,addLike);
router.post('/comment',setComment);
router.post('/savepost',auth,savePost);
router.post('/unsavepost',unsavepost);

//Profile
router.post('/editprofile',auth,editprofile);
router.post('/getuserdetails',getUserDetails);
router.get('/getUser',getUserQuery);
router.post('/addfollower',addFollower);
router.post('/editprofile',auth,editprofile);
router.post('/removefollower',auth,removeFollower);
router.post('/getfollowers',getFollower);

//Chat
router.post('/getchat',auth,getChat);
router.get('/conversation',auth,getConversations);
router.post('/message',auth,sendMessage);

//notification 
router.post('/notifications',auth,getNotification);
router.get('/seennotification',auth,seenNotification);
router.get('/checknotification',auth,checknotification);

//problems
router.post('/newproblem',auth,CreateProblem);
router.get('/getproblem',getProblem);
router.get('/problems',getProblems);
router.get('/problem/user',getUserProblems);
router.post('/problems/tag',getProblemswithTag);
router.get("/problems/count",getProblemsCount);

module.exports = router;
