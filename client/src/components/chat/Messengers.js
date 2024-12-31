import React, { useEffect, useState } from "react";
import "./messenger.css";
import { Avatar, Skeleton, Snackbar, Button } from "@mui/material";
import profilepic from "./../../static/profile.jpeg";
import sonu from "./../../static/profile.jpeg";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import Chat from "./Chat";
import axios from "axios";
import {SignOut} from 'phosphor-react';
import path from "../../path";
import Modal from "../common/Modal";
import image from "./../../static/userill.jpg";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../utils/slices/userSlice";
import { setToken } from "../../utils/slices/utilitySlice";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const ChatThumbNailSkeleton = () => {
  return (
    <div className="chatThumbnailSkeleton">
      <Skeleton
        width={50}
        height={50}
        variant="circular"
        animation={"wave"}
      ></Skeleton>
      <div style={{ flex: 1 }}>
        <Skeleton height={30}></Skeleton>
        <Skeleton height={20} width={50}></Skeleton>
      </div>
    </div>
  );
};

const ChatSkeleton = () => {
  return (
    <div className="chatSkeleton chat">
      <div className="chat-top">
        <div>
          <Skeleton variant="circular" width={40} height={40}></Skeleton>
          <Skeleton height={40} width={100}></Skeleton>
        </div>
      </div>
      <div className="chat-body">
        <div className="message">
          <Skeleton width={70} height={50}></Skeleton>
        </div>
        <div className="message">
          <Skeleton width={120} height={50}></Skeleton>
        </div>
        <div className="message right-message">
          <Skeleton
            width={150}
            height={50}
            className="right-message"
          ></Skeleton>
        </div>
        <div className="message right-message">
          <Skeleton width={60} height={50} className="right-message"></Skeleton>
        </div>
        <div className="message">
          <Skeleton width={70} height={50}></Skeleton>
        </div>
      </div>
      <div className="chat-bottom-skelton">
        <Skeleton variant="circular" width={30} height={30}></Skeleton>
        <Skeleton height={40} style={{ flex: 1 }}></Skeleton>
      </div>
    </div>
  );
};

const Messenger = () => {

  const [ActiveChat, setActiveChat] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [SearchParams] = useSearchParams();
  const UserDB = useSelector((s) => s.user.userDB);
  const navigate = useNavigate();
  const reciverUser = SearchParams.get("user");
  const [chats, setChats] = useState([]);
  const chatid = SearchParams.get("id");
  const [loadChatAgain, setLoadChatAgain] = useState(false);
  const [conversationLoad, setConversationsLoad] = useState(false);
  const [chatLoad, setChatLoad] = useState(false);
  const [loginError,setLoginError] = useState(false);
  const [load,setload] = useState(false);

  const dispatch = useDispatch()

  const getUserConv = async () => {
    if (reciverUser) {
      const response = await axios.post(path + "getchat", {
        username: reciverUser,
        userid: UserDB._id,
      });

      if (response.data.success) {
        navigate("?id=" + response.data.conversationID);
      }
    }
  };

  const guestLogin = async () => {
    setload(true);

    const response = await axios.post(`${path}login`, {
      password: "@Admin1234",
      email: "naveen@venom.navi",
    });

    console.log(response);
    if (response.data.success) {
      dispatch(setToken(response.data.token));
      dispatch(addUser(response.data.user));
      setload(false);
      setLoginError(false);
      navigate("/");
    }
    setload(false);
  };

  const getChat = async () => {
    setChatLoad(true);
    if (chatid) {
      const chatResponse = await axios.post(path + "getchat", {
        id: chatid,
        userid: UserDB._id,
      });
      if (chatResponse.data.success) {
        const active = chatResponse.data.chat;
        setActiveChat(active);
      }
    }
    setChatLoad(false);
  };

  useEffect(() => {
    if (reciverUser) {
      getUserConv();
    }
  }, [reciverUser]);

  useEffect(() => {
    if (chatid) {
      getChat();
    }
  }, [chatid, loadChatAgain]);

  useEffect(() => {
    if (window.screen.width < 500) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    if(!UserDB){
      setLoginError(true);
    }
  }, []);

  const getConversations = async () => {
    setConversationsLoad(true);
    try {
      const res = await axios.get(path + "conversation", {
        headers: {
          id: UserDB._id,
        },
      });

      if (res.data.success) {
        setChats(res.data.conversations);
        setConversationsLoad(false);
      }
    } catch (err) {}
    setConversationsLoad(false);
  };

  useEffect(() => {
    getConversations();
  }, []);

  return (
    <div className="messenger">
      {mobile ? (
        <>
          {" "}
          {!ActiveChat ? (
            <>
              <div className="chats">
                <div className="messenger-top">
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      sx={{
                        bgcolor: "yellow",
                        color: "black",
                        width: "30px",
                        height: "30px",
                      }}
                      src={profilepic}
                      variant="dot"
                    ></Avatar>
                  </StyledBadge>
                  <span>Messenger</span>
                </div>

                {chats?.length == 0 && <div>No Chats Here</div>}
                {conversationLoad && (
                  <div>
                    <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                    <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                    <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                    <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                    <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                    <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                    <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                    <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                    <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                  </div>
                )}

                {chats.map((ele) => {
                  const userDisplay =
                    ele.users[0]?.username == UserDB.username
                      ? ele.users[1]
                      : ele.users[0];
                  return (
                    <Paper
                      onClick={() => {
                        navigate("/chat?id=" + ele._id);
                        setLoadChatAgain(!loadChatAgain);
                      }}
                    >
                      <div
                        className={
                          ele == ActiveChat
                            ? "chat-thumbnail Active-chat-thumbnail"
                            : "chat-thumbnail"
                        }
                      >
                        <Avatar src={userDisplay?.profilePicture}></Avatar>
                        <div>
                          <p>
                            {userDisplay?.firstname +
                              " " +
                              userDisplay?.lastname}
                          </p>
                          <span></span>
                        </div>
                      </div>
                    </Paper>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {chatLoad ? (
                <ChatSkeleton></ChatSkeleton>
              ) : (
                <Chat data={ActiveChat} cancel={setActiveChat}></Chat>
              )}
            </>
          )}
        </>
      ) : (
        // PC PC PC  PC PC PC  PC PC PC  PC PC PC  PC PC PC  PC PC PC  PC PC PC  PC PC PC  PC PC PC  PC PC PC  PC PC PC  PC PC PC  PC PC PC
        <>
          <div className="chats">
          <div className="messenger-top">
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar
                      sx={{
                        bgcolor: "yellow",
                        color: "black",
                        width: "30px",
                        height: "30px",
                      }}
                      src={profilepic}
                      variant="dot"
                    ></Avatar>
                  </StyledBadge>
                  <span>Messenger</span>
                </div>
            {chats?.length == 0 && (
              <>
                <div className="centerAll">No Chats Here</div>
                <Link to="/search" className="centerAll">
                  <Button variant="outlined">Start Search</Button>
                </Link>
              </>
            )}
            {conversationLoad && (
              <div>
                <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
                <ChatThumbNailSkeleton></ChatThumbNailSkeleton>
              </div>
            )}
            {chats.map((ele) => {
              const userDisplay =
                ele.users[0]?.username == UserDB.username
                  ? ele.users[1]
                  : ele.users[0];
              return (
                <Paper onClick={() => navigate("/chat?id=" + ele._id)}>
                  <div
                    className={
                      ele._id == ActiveChat?._id
                        ? "chat-thumbnail Active-chat-thumbnail"
                        : "chat-thumbnail"
                    }
                  >
                    <Avatar src={userDisplay?.profilePicture}></Avatar>
                    <div>
                      <p>
                        {userDisplay?.firstname + " " + userDisplay?.lastname}
                      </p>
                      <span>
                        {!(ele._id == ActiveChat?._id) && (
                          <> {ele?.lastMessage?.msg} </>
                        )}
                      </span>
                    </div>
                  </div>
                </Paper>
              );
            })}
          </div>

          {chatLoad ? (
            <ChatSkeleton></ChatSkeleton>
          ) : (
            <div className="chat">
              {" "}
              {ActiveChat ? (
                <Chat data={ActiveChat}></Chat>
              ) : (
                <div className="centerAllChat">
                  <div>
                    <img src={image}></img>
                    <p>Start A Conversation</p>
                  </div>
                </div>
              )}{" "}
            </div>
          )}
        </>
      )}

       {loginError && (
        <Modal
          cancel={() => {
            setLoginError(false)
            navigate('/');
          }}
          Icon={SignOut}
          heading={"You are Not logged In"}
          subheading={
            "Dont want to add an account ? You can Guest Login to access feature and Try Website"
          }
          leftButton={true}
          leftButtonFunction={guestLogin}
          leftButtonText={"Guest"}
          confirmButtonText={"Signin"}
          confirm={() => navigate("/login")}
        ></Modal>
      )}

    </div>

  );
};

export default Messenger;
