import React, { useEffect, useState } from "react";
import "./messenger.css";
import { Avatar } from "@mui/material";
import profilepic from "./../../static/profile.jpeg";
import sonu from './../../static/chat.jpg';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import Chat from './Chat';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));




const Messenger = () => {

  const [mobile,setMobile] = useState(false);
  useEffect(()=>{

    if(window.screen.width < 500){
       setMobile(true);
    }else{
      setMobile(false);
    }

  });

  const [ActiveChat,setActiveChat] = useState("");
  const [chats,setChats] = useState(["Venom","Naveen","Aegon","Sonu","Kittu","Praveen","Karan","Rohit","Bh","Ragnar","Lucifer","samael"]);

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
            width: "60px",
            height: "60px",
          }}
          src={profilepic}
          variant="dot"
        ></Avatar>
        </StyledBadge>
        <span>Messenger</span>
      </div>
      {
        mobile ?  <div className="chats Mobile-Chats">
        <div> Back </div>
          {
            chats.map((ele)=>{
              return (
                <Paper onClick={()=>setActiveChat(ele)}>
                <div className={ele == ActiveChat ? "chat-thumbnail Active-chat-thumbnail":"chat-thumbnail"}>
                    <Avatar src={sonu}></Avatar>
                    <div>
                      <p>{ele}</p>
                      <span>How are you</span>
                    </div>
                </div>
                </Paper>
              );
            })
          }
          </div> 
          : 
       <div className="chats">
          {
            chats.map((ele)=>{
              return (
                <Paper onClick={()=>setActiveChat(ele)}>
                <div className={ele == ActiveChat ? "chat-thumbnail Active-chat-thumbnail":"chat-thumbnail"}>
                    <Avatar src={sonu}></Avatar>
                    <div>
                      <p>{ele}</p>
                      <span>How are you</span>
                    </div>
                </div>
                </Paper>
              );
            })
          }
          </div>
      }
          <div className="chat">
              <Chat></Chat>
          </div>
    </div>
  );
};

export default Messenger;
