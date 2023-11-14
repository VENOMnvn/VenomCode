import React, { useState } from "react";
import "./messenger.css";
import { Avatar } from "@mui/material";
import profilepic from "./../../static/profile.jpeg";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';

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


  const [chats,setChats] = useState(["Venom","Naveen","Aegon","Sonu","Karan","Prabeen","Yash","KIttu"]);

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
      <div className="messenger-body">
      <div className="chats">
          {
            chats.map((ele)=>{
              return (
                <Paper>
                  
                <div className="chat-thumbnail">
                    <Avatar src={profilepic}></Avatar>
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

          <div className="chat">
            
          </div>
      </div>
    </div>
  );
};

export default Messenger;
