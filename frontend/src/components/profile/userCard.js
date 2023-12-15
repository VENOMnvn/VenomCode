import React, { useEffect, useState } from "react";
import userill from "./../../static/userill.jpg";
import "./profile.css";
import { Button, Skeleton } from "@mui/material";
import axios from "axios";
import path from "../../path";
import { ToastContainer, toast } from "react-toastify";
import { UserPlus, UserMinus, ChatDots } from "phosphor-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUserDB } from "../../utils/slices/userSlice";

const UserCard = ({ username }) => {
  const userDB = useSelector((state) => state.user.userDB);
  const [isFriendLoad, setIsFriendLoad] = useState(false);
  const [load, setload] = useState(true);
  const [data, setData] = useState(false);
  const dispatch = useDispatch();

  const getUserData = async () => {
    setload(true);
    try {
      console.assert(username);
      const response = await axios.get(`${path}getUser?username=${username}`);
      if (response.data.success) {
        setData(response.data.user);
      }
    } catch (err) {
      console.log(err);
    }
    setload(false);
  };

  useEffect(() => {
    getUserData();
  }, [username]);

  const addFollower = async () => {
    if (!userDB) {
      toast.info("Please Login to Follow");
      return;
    }
    setIsFriendLoad(true);

    try {
      console.log("Adding " + username + " as a friend by " + userDB.username);

      const body = {
        followerId: userDB.username,
        followingId: username,
      };

      const response = await axios.post(`${path}addfollower`, body);
      getUserDetails();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
    setIsFriendLoad(false);
  };

  const removeFollower = async () => {
    try {
      console.log("remove", username);
      const response = await axios.post(path + "removefollower", {
        username: username,
        FollowUsername: userDB.username,
        userId: userDB._id,
      });

      console.log(response.data);
      if (response.data.success) {
        getUserDetails();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async () => {
    if (userDB) {
      try {
        const res = await axios.post(`${path}getuserdetails`, {
          userid: userDB?._id,
        });

        if (res.data.success) {
          dispatch(addUserDB(res.data.user));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {!load ? (
        <div className="usercard">
          <ToastContainer></ToastContainer>
          
          <Link className="usercard-img" to={`/user/${username}`}>
            <img src={data?.profilePicture}></img>
          </Link>

          <div className="usercard-username">
            {data?.firstname + " " + data?.lastname}
          </div>

          <p>{username}</p>

          {userDB?.following?.includes(username) ? (
            <>
              <Link style={{ width: "100%", padding: "3px 8px" }}>
                <Button
                  variant="outlined"
                  sx={{}}
                  fullWidth
                  startIcon={<UserMinus size={18}></UserMinus>}
                  onClick={removeFollower}
                >
                  Unfollow
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link style={{ width: "100%", padding: "3px 8px" }}>
                <Button
                  variant="contained"
                  sx={{}}
                  disabled={isFriendLoad}
                  fullWidth
                  startIcon={<UserPlus size={18}></UserPlus>}
                  onClick={addFollower}
                >
                  Follow
                </Button>
              </Link>
            </>
          )}

          <Link to={`/chat?user=`+username} style={{ width: "100%", padding: "3px 8px" }}>
            <Button
              sx={{}}
              fullWidth
              startIcon={<ChatDots size={18}></ChatDots>}
            >
              Message
            </Button>
          </Link>
        </div>
      ) : (
        <div className="usercard-skelton">
          <Skeleton width={150} height={150} animation={"wave"}></Skeleton>
          <Skeleton width={140} height={20} animation={"wave"}></Skeleton>
          <Skeleton width={100} height={10} animation={"wave"}></Skeleton>
          <Skeleton width={140} height={40} animation={"wave"}></Skeleton>
        </div>
      )}
    </>
  );
};

export default UserCard;
