import { Avatar, Button, ButtonBase, CircularProgress, Menu } from "@mui/material";
import React, { useEffect, useState } from "react";
import profilepic from "./../../static/profile.jpeg";
import "./profile.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import HomeFeed from "../homepage/homefeed";
import Paper from "@mui/material/Paper";
import ReplayIcon from "@mui/icons-material/Replay";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import path from "../../path";
import userill from "../../static/userill.jpg";
import { ToastContainer, toast } from "react-toastify";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { MenuItem } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';

const UserProfilepage = () => {
  const [user, setuser] = useState("");
  const userDB = useSelector((s) => s.user.user);
  const [load, setload] = useState(false);
  const [msg, setmsg] = useState("Loading...");
  const [isFriendLoad, setIsFriendLoad] = useState(false);
  const { id } = useParams();

  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  const [backgroundDetails, setBackgroundDetails] = useState({
    occupation: "Student",
    experience: "3",
    noOfPost: "34",
    followers: "432",
    college: "St cf Andrews School",
    location: "Noida",
  });


  const getUser = async (req, res) => {
    try {

      const response = await axios.post(`${path}getuserdetails`, {
        username: id,
        visitor:userDB?._id
      });

      if (response.data.success) {

        console.log(response.data.user);
        setuser(response.data.user);

      } else {
        setmsg("User not found");
      }
    } catch (err) {
      setmsg("Some Error Occured");
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);




  const addFollower = async () => {
    if (!userDB) {
      toast.info("Please Login to Follow");
      return;
    }
    setIsFriendLoad(true);

    try {
      console.log(
        "Adding " + user.username + " as a friend by " + userDB.username
      );

      const body = {
        followerId: userDB.username,
        followingId: user.username,
      };
      
      const response = await axios.post(`${path}addfollower`, body);
      getUser();
    } catch (err) {
      console.log(err);
    }
    setIsFriendLoad(false);

  };

  const [skills, setSkills] = useState([
    "C++",
    "JavaScript",
    "ES6",
    "React",
    "Redux",
    "C",
    "HTML",
    "CSS",
    "NodeJS",
    "ExpresJS",
    "MongoDB",
  ]);

  return (
    <>
      {user && !load ? (
        <div className="profilepage">
          <ToastContainer></ToastContainer>
          <div className="cover-image">
            <div className="profile-pic">
              <Avatar src={user?.profilePicture}></Avatar>
            </div>
          </div>
          <div className="cover-image-coverup">
            <div>
              <div>{user?.firstname + " " + user?.lastname}</div>
              <p>{user?.username}</p>
            </div>
            <Menu
              open={showMenu}
              anchorEl={anchorEl}
              onClose={() => setShowMenu(false)}
            >
              <MenuItem>
                {" "}
                <ListItemIcon>
                  <MessageRoundedIcon></MessageRoundedIcon>
                </ListItemIcon>
                <ListItemText>Message</ListItemText>
                {/* <Typography variant="body2" color="text.secondary">
                  ⌘X
                </Typography> */}
              </MenuItem>
              <MenuItem>
                {" "}
                <ListItemIcon>
                  <PersonRemoveRoundedIcon></PersonRemoveRoundedIcon>
                </ListItemIcon>
                <ListItemText>Remove</ListItemText>
                {/* <Typography variant="body2" color="text.secondary">
                  ⌘X
                </Typography> */}
              </MenuItem>
             
            </Menu>
            {user?.isFollower ? (
              <div
                className="icons-back"
                onClick={(e) => {
                  setAnchorEl(e.target);
                  setShowMenu(true);
                }}
              >
                <MoreVertRoundedIcon></MoreVertRoundedIcon>
              </div>
            ) : (
              <Button
                variant="outlined"
                className="addFreind"
                startIcon={<PersonAddIcon></PersonAddIcon>}
                onClick={addFollower}
                disabled={isFriendLoad}
              >
              Follow      
              </Button>
            )}
          </div>

          <div className="profile-page-body">
            <div className="left">
              <span>About</span>
              <div className="about">
                <p>{user?.bio}</p>
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
                    <p>{user?.exp}</p>
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
                {user?.skills?.map((ele) => (
                  <span>{ele}</span>
                ))}
              </div>
            </div>
          </div>
          <hr style={{ marginTop: "12px" }}></hr>
          <div className="profile-page-post-title">
            Posts
            <ReplayIcon></ReplayIcon>
          </div>
          <hr style={{ marginTop: "12px" }}></hr>
          <div className="profile-page-post">
            <HomeFeed></HomeFeed>
          </div>
        </div>
      ) : (
        <div className="fullscreen centerAll">
          <Avatar
            src={userill}
            sx={{ width: "200px", height: "200px" }}
          ></Avatar>
          <p>{msg}</p>
        </div>
      )}
    </>
  );
};

export default UserProfilepage;
