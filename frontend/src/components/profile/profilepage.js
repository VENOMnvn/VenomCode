import { Avatar, Button, ButtonBase, Tab, Tabs, Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import profilepic from "./../../static/profile.jpeg";
import "./profile.css";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import PopUp from "../common/popup";
import axios from "axios";
import EditProfile from "./EditProfile";
import path from "../../path";
import { addUserDB } from "../../utils/slices/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import Post from "../homepage/Post";
import UserCard from "./userCard";
import { Link } from "react-router-dom";

const Profilepage = () => {
  const user = useSelector((state) => state.user.user);

  const [SearchParams] = useSearchParams();

  const [show, setshow] = useState(SearchParams.get('edit'));
  const [saved,setSaved] = useState(SearchParams.get("saved"));
  const savedRef = useRef();
  const userDB = useSelector((state) => state.user.userDB);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tabPanel, settabPanel] = useState(0);
  
  useEffect(()=>{
      if(saved){
        settabPanel(1);
        savedRef.current?.scrollIntoView();
      }
  },[saved]);

  useEffect(() => {
    if (!user) {
      navigate("../pleaselogin", { replace: true });
    }
  }, []);
  
  const editPop = () => {
    setshow(true);
  };

  const getUserDetails = async () => {
    if (user) {
      try {
        const res = await axios.post(`${path}getuserdetails`, {
          userid: user?._id,
        });
        if (res.data.success) {
          dispatch(addUserDB(res.data.user));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };


  const TabPanelChangeHandler = (event, newValue) => {
    settabPanel(newValue);
  };


  const getFollower = async () => {
    try {
      console.log("==");
      const resp = await axios.post(`${path}getfollowers`,{
        userid:user?._id
     });
     console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
    getFollower();
  }, []);

  return (
    <div className="profilepage">
      {show && (
        <PopUp
          cancel={() => setshow(false)}
          element={<EditProfile></EditProfile>}
        ></PopUp>
      )}
      <div className="cover-image">
        <div className="profile-pic">
          <Avatar src={userDB?.profilePicture}></Avatar>
        </div>
      </div>
      <div className="cover-image-coverup">
        <div>
          <div>{user?.firstname + " " + user?.lastname}</div>
          <Tooltip title={"username"}>
            <p>{user?.username}</p>
          </Tooltip>
        </div>
        <Button
          variant="outlined"
          className="addFreind"
          startIcon={<EditIcon></EditIcon>}
          onClick={editPop}
        >
          Edit
        </Button>
      </div>

      <div className="profile-page-body">
        <div className="left">
          <span>About</span>
          <div className="about">
            <p>{userDB?.bio}</p>
          </div>
          <p>Background</p>
          <div className="background">
            <div className="background-row">
              <div className="background-left">Designation</div>
              <div className="background-right">
                <p>{userDB?.designation}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">Experience</div>
              <div className="background-right">
                <p>{userDB?.exp +" years"}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">Post</div>
              <div className="background-right">
                <p>{userDB?.posts?.length + " posts"}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">Followers</div>
              <div className="background-right">
                <p>{userDB?.followers?.length+" Follower"}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">College</div>
              <div className="background-right">
                <p>{userDB?.organisation}</p>
              </div>
            </div>

            <div className="background-row">
              <div className="background-left">Location</div>
              <div className="background-right">
                <p>{userDB?.city}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <div>Skills and Languages</div>
          <div>
            {userDB?.skills?.map((ele) => (
              <span>{ele}</span>
            ))}
          </div>
        </div>
      </div>
      <hr style={{ marginTop: "12px" }}></hr>

      <div elevation={6} className="profile-page-post-title">
        {/* Posts
      <ReplayIcon></ReplayIcon> */}
        <Tabs
          value={tabPanel}
          onChange={TabPanelChangeHandler}
          variant="scrollable"
          scrollButtons
          ref={savedRef}
          allowScrollButtonsMobile
          selectionFollowsFocus 
        >
          <Tab label={"Posts"}></Tab>
          <Tab label={"Saved"}></Tab>
          <Tab label={"Followers"}></Tab>
          <Tab label={"Following"}></Tab>
        </Tabs>
      </div>

      <hr style={{ marginTop: "12px" }}></hr>
      {tabPanel == 0 && (
        <div

          className="profile-page-post"
          style={{ backgroundColor: "aliceblue" }}
        >
          {userDB?.posts?.map((ele) => (
            <Post data={ele}></Post>
          ))}
        </div>
      )}

      {tabPanel == 1 && (
        <div
          className="profile-page-post"
          style={{ backgroundColor: "aliceblue" }}
        >
          {userDB?.savedpost?.map((ele) => (
            <Post data={ele}></Post>
          ))}
         
        </div>
      )}

      {tabPanel == 3 && (
        <div
           className="usercard-container"
        >
          {userDB?.following?.map((ele) => (
            <div> <UserCard username={ele}></UserCard></div>
          ))}

          {
            userDB?.following?.length == 0 && <div className="fullwidth centerAll"> You dont Follow any one <Link to='/search'>Find here</Link></div> 
          }

        </div>
      )}

      {tabPanel == 2 && (
        <div
          className="usercard-container"
        >  
          {userDB?.followers.map((ele) => <div>
              <UserCard username={ele}></UserCard>
            </div>
          )}
          {
            userDB?.followers?.length == 0 && <div className="usercard-empty"> No one Follows you </div> 
          }

        </div>
      )}
    </div>
  );
};

export default Profilepage;
