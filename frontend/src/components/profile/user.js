import { Avatar, Button, ButtonBase } from "@mui/material";
import React, { useState } from "react";
import profilepic from "./../../static/profile.jpeg";
import "./profile.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeFeed from "../homepage/homefeed";
import Paper from '@mui/material/Paper';
import ReplayIcon from '@mui/icons-material/Replay';
import {useSelector} from 'react-redux';

const UserProfilepage = () => {

  const user = useSelector(state=>state.user.user);

  const [backgroundDetails, setBackgroundDetails] = useState({
    occupation: "Student",
    experience: "3",
    noOfPost: "34",
    followers: "432",
    college: "St cf Andrews School",
    location: "Noida",
  });

  const [skills,setSkills] = useState(["C++","JavaScript","ES6","React","Redux","C","HTML","CSS","NodeJS","ExpresJS","MongoDB"]);

  return (
    <div className="profilepage">
      <div className="cover-image">
        <div className="profile-pic">
          <Avatar src={profilepic}></Avatar>
        </div>
      </div>
      <div className="cover-image-coverup">
        <div>
          <div>Naveen Chaudhary</div>
          <p>{}</p>
        </div>
        <Button
          variant="outlined"
          className="addFreind"
          startIcon={<PersonAddIcon></PersonAddIcon>}
        >
          Add Friend
        </Button>
      </div>

      <div className="profile-page-body">
        <div className="left">
          <span>About</span>
          <div className="about">
            <p>
              I am a Web Developer and I know HTML CSS JS react and many other
              front end framework and I also study in JSS college
            </p>
          </div>
          <p>Background</p>
          <div className="background">
            <div className="background-row">
              <div className="background-left">Occupation</div>
              <div className="background-right">
                <p>{user?.designation}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">Experience</div>
              <div className="background-right">
                <p>{backgroundDetails.experience}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">Post</div>
              <div className="background-right">
                <p>{backgroundDetails.noOfPost}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">Followers</div>
              <div className="background-right">
                <p>{backgroundDetails.followers}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">College</div>
              <div className="background-right">
                <p>{user?.organisation}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">Location</div>
              <div className="background-right">
                <p>{user?.city}</p>
              </div>
            </div>

          </div>
        </div>
        <div className="right">
            <div>Skills and Languages</div>
            <div>

            {user?.skills.map((ele)=><span>{ele}</span>)}

            </div>
        </div>
      </div>
      <hr style={{marginTop:"12px"}}></hr>
      <Paper elevation={6} className="profile-page-post-title">
      Posts
      <ReplayIcon></ReplayIcon>
      </Paper>
      <hr style={{marginTop:"12px"}}></hr>
      <div className="profile-page-post">
      <HomeFeed></HomeFeed>
      </div>

    </div>
  );
};

export default UserProfilepage;
