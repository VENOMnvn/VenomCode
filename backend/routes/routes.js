const { userRegisteration,userSignin,getUserName} = require("../Controllers/userRegisteration");
const userLogin = require("../Controllers/userLogin");
const SendOtp = require("../Controllers/SendOtp");
const userLogout = require("../Controllers/userLogout");
const filterFunction = require("../Controllers/filter");
const { proffesionalData } = require("../Controllers/userRegisteration");
const { profileComplete } = require("../Controllers/userRegisteration");
const { addExperience } = require("../Controllers/userRegisteration");
const { addDetails } = require("../Controllers/userRegisteration");
const { uploadDocs } = require("../Controllers/userRegisteration");
const {editprofile} = require("./../Controllers/profile");
const {sharePost,getPosts,addLike,postFilter}  = require("./../Controllers/post");

const { upload } = require("../middleware/multerConfig");

const express = require("express");
const User = require("../MongoDB/UserSchema");
const router = express.Router();


router.post("/register", userRegisteration); //check
router.post('/signin',userSignin);
router.post("/login", userLogin);
router.post("/sharepost",sharePost);
router.get('/posts',getPosts);
router.post('/addlike',addLike);
router.post('/postfilter',postFilter);
router.post('/editprofile',editprofile);
router.get('/getusername',getUserName);


router.get("/logout", userLogout);
router.post("/filter", filterFunction);
router.post("/addExperience", addExperience);
router.post("/proffesionalData", profileComplete);

module.exports = router;
