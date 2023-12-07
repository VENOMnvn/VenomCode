import React, { useEffect, useState } from "react";
import "./messenger.css";
import { Avatar, Skeleton, Snackbar } from "@mui/material";
import profilepic from "./../../static/profile.jpeg";
import sonu from "./../../static/profile.jpeg";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Paper from "@mui/material/Paper";
import Chat from "./Chat";
import axios from "axios";
import path from "../../path";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

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

const Messenger = () => {

  const [ActiveChat, setActiveChat] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [SearchParams] = useSearchParams();
  const UserDB = useSelector((s) => s.user.userDB);
  const navigate = useNavigate();
  const reciverUser = SearchParams.get("user");
  const [chats, setChats] = useState([]);
  const chatid = SearchParams.get("id");

  const [conversationLoad,setConversationsLoad] = useState(false);
  const [chatLoad,setChatLoad] = useState(false);

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
  }, [chatid]);

  useEffect(() => {
    if (window.screen.width < 500) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, []);

  const getConversations = async ()=>{
    setConversationsLoad(true);
    try{
        const res = await axios.get(path+'conversation',{
          headers:{
            id:UserDB._id
          }
        });
      
        if(res.data.success){
          setChats(res.data.conversations);
          setConversationsLoad(false);
        }

    }catch(err){

    }
    setConversationsLoad(false);
  }

  useEffect(()=>{
    getConversations();
  },[]);


  return (
    <div className="messenger">
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
        <span>Chats</span>
      </div>

      {mobile ? (
        <div className="chats Mobile-Chats">
          
          {
            chats?.length==0 && <div>No Chats Here</div>
          }
          {chats.map((ele) => {
            const userDisplay = ele.users[0]?.username == UserDB.username ? ele.users[1]  : ele.users[0];
            return (
              <Paper onClick={() => setActiveChat(ele)}>
                <div
                  className={
                    ele == ActiveChat
                      ? "chat-thumbnail Active-chat-thumbnail"
                      : "chat-thumbnail"
                  }
                >
                  <Avatar src={userDisplay?.profilePicture}></Avatar>
                </div>
              </Paper>
            );
          })}
        </div>
      ) : (
        
        <div className="chats">

          {
            chats?.length==0 && <div>No Chats Here</div>
          }

          {
            conversationLoad && <div>

              <div style={{
                display:"flex",
                alignItems:"center",
                padding:"5px"
              }}>
                <Skeleton height={50} width={50} variant="circular" animation="wave"></Skeleton>
                <Skeleton height={80} style={{flex:1}} animation="wave"></Skeleton>
              </div>
              <div style={{
                display:"flex",
                alignItems:"center",
                padding:"5px"
              }}>
                <Skeleton height={50} width={50} variant="circular"></Skeleton>
                <Skeleton height={80} style={{flex:1}}></Skeleton>
              </div>              <div style={{
                display:"flex",
                alignItems:"center",
                padding:"5px"
              }}>
                <Skeleton height={50} width={50} variant="circular"></Skeleton>
                <Skeleton height={80} style={{flex:1}}></Skeleton>
              </div>              <div style={{
                display:"flex",
                alignItems:"center",
                padding:"5px"
              }}>
                <Skeleton height={50} width={50} variant="circular"></Skeleton>
                <Skeleton height={80} style={{flex:1}}></Skeleton>
              </div>
               
            </div>
          }

          {chats.map((ele) => {

            const userDisplay = ele.users[0]?.username == UserDB.username ? ele.users[1]  : ele.users[0];

            return (
              <Paper onClick={() => navigate("/chat?id="+ele._id) }>
                <div
                  className={
                    ele == ActiveChat
                      ? "chat-thumbnail Active-chat-thumbnail"
                      : "chat-thumbnail"
                  }
                >
                  <Avatar src={userDisplay?.profilePicture}></Avatar>
                  <div>
                    <p>{userDisplay?.firstname + " " + userDisplay?.lastname}</p>
                    <span></span>
                  </div>
                </div>
              </Paper>
            );
          })}
        </div>
      )}
      {
        chatLoad ? <div className="chat">
            <Skeleton height={100}></Skeleton>
        </div> : 
        <div className="chat"> {ActiveChat ? <Chat data={ActiveChat}></Chat> : <></>} </div>
      }
    </div>
  );
};

export default Messenger;
