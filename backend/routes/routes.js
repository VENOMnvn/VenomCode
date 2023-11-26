const { userRegisteration,userSignin,getUserName,addExperience,profileComplete} = require("../Controllers/userRegisteration");
const userLogin = require("../Controllers/userLogin");
const userLogout = require("../Controllers/userLogout");
const filterFunction = require("../Controllers/filter");
const {editprofile,getUserDetails,getUserQuery} = require("./../Controllers/profile");
const {sharePost,getPosts,addLike,postFilter,setComment,getPost}  = require("./../Controllers/post");
const express = require("express");
const router = express.Router();


router.post("/register", userRegisteration); //check
router.post('/signin',userSignin);
router.post("/login", userLogin);
router.post("/sharepost",sharePost);
router.get('/posts',getPosts);
router.post('/getpost',getPost);
router.post('/addlike',addLike);
router.post('/postfilter',postFilter);
router.post('/editprofile',editprofile);
router.get('/getusername',getUserName);
router.post('/getuserdetails',getUserDetails);
router.post('/comment',setComment);
router.get('/getUser',getUserQuery);



router.get("/logout", userLogout);
router.post("/filter", filterFunction);
router.post("/addExperience", addExperience);
router.post("/proffesionalData", profileComplete);

module.exports = router;
