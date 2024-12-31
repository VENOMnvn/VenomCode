import { Avatar,Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./profile.css";
import {useDispatch, useSelector} from 'react-redux';
import axios from "axios";
import path from "../../path";
import { Link } from "react-router-dom";
import { addUserDB } from "../../utils/slices/userSlice";
import { useNavigate } from "react-router-dom";
import Post from "../homepage/Post";

const SavedPost = () => {

  const user = useSelector(state=>state.user.user);
  const [userDB,setuserDB] = useState(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      navigate('../pleaselogin',{ replace: true });
    };
  },[]);

  const getUserDetails = async ()=>{
    if(user){
      try{
        const res = await axios.post(`${path}getuserdetails`,{
          userid : user?._id,
        });
        if(res.data.success){
          setuserDB(res.data.user);
          dispatch(addUserDB(res.data.user));
        }
      }catch(err){
        console.log(err);
      }
    }
  };



  useEffect(()=>{
    getUserDetails();
  },[]);

  return (
    <div className="profilepage">
      <div className="cover-image">
        <div className="profile-pic">
          <Link to='/profile'>
          <Avatar src={userDB?.profilePicture}></Avatar>
          </Link>
        </div>
      </div>
      <div className="cover-image-coverup">
        <div>
          <div>{user?.firstname+" "+user?.lastname}</div>
          <Tooltip title={"username"}>
          <p>{user?.username}</p>
          </Tooltip>
        </div>
        {/* <Button
          variant="outlined"
          className="addFreind"
          startIcon={<EditIcon></EditIcon>}
          onClick={editPop}
        >
          Edit
        </Button> */}
      </div>

      <hr style={{marginTop:"12px"}}></hr>
      <div elevation={2} className="profile-page-post-title">
       Saved Posts
      {/* <ReplayIcon></ReplayIcon> */}
      </div>

      <hr style={{marginTop:"12px"}}></hr>
      <div className="profile-page-post">
      {/* <HomeFeed></HomeFeed> */}
      {
        userDB?.savedpost?.map((ele)=><Post data={ele}></Post>)
      }
      </div>

    </div>
  );
};

export default SavedPost;
