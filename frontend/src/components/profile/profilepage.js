import { Avatar, Button, ButtonBase } from "@mui/material";
import React from "react";
import profilepic from "./../../static/profile.jpeg";
import "./profile.css";


const Profilepage = () => {
  return (
    <div className="profilepage">
      <div className="cover-image">
        <div className="profile-pic">
          <Avatar src={profilepic}></Avatar>
        </div>
      </div>
      <div className="cover-image-coverup">
         <div><div>Naveen Chaudhary</div>
         <p>Web Developer</p></div>
         <Button variant="outlined" className="addFreind">Add Friend</Button>
      </div>
      
    </div>
  );
};

export default Profilepage;
