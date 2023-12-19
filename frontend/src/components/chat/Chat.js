import React, { useEffect, useRef, useState } from "react";
import profile from "./../../static/profile.jpeg";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { TextField } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Message from "./Message";
import { KeyReturn } from "phosphor-react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import axios from "axios";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import path from "../../path";
import {io} from 'socket.io-client';

const Chat = ({ data, cancel }) => {

  const [msgs, setMsgs] = useState(data.messages);
  const [currentMsg, setcurrentMsg] = useState("");
  const userDB = useSelector((s) => s.user.userDB);
  const chatbodyref = useRef();
  const [EnterKeySend, setEnterKeySend] = useState(true);
  const [activeUser, setActiveUser] = useState(0);
  const socket = useRef();

  useEffect(()=>{
    socket.current = io(path);
    let id = userDB.username;
    socket.current.emit('setup',id);

    socket.current.on('message-recieved',(msg)=>{
      setMsgs((prevState)=>[...prevState,msg]);
    })

  },[]);

  useEffect(() => {

    data?.users?.forEach((user) => {
      if (user.username != userDB.username) {
        setActiveUser(user);
      }
    });

  }, [data]);

  useEffect(() => {
    setMsgs(data.messages);
  }, [data]);

  useEffect(() => {
    let element = chatbodyref.current;
    element.scrollTop = element.scrollHeight;
  }, [msgs]);

  const MessageSend = async () => {

    const username = activeUser.username;

    
    if (!currentMsg || currentMsg.length == 0 || currentMsg == "\n") {
      return;
    }
    
    try {
      
      const currentMsgTemp = currentMsg;
      setcurrentMsg("");
      socket.current.emit('message-send',{
        msg: currentMsg,
        username:activeUser.username,
        chatID: data._id,
        sender: userDB.username,
        userID: userDB._id,
      });
      
      const response = await axios.post(path + "message", {
        msg: currentMsgTemp,
        chatID: data._id,
        sender: userDB.username,
        userID: userDB._id,
      });

      
      let msg22 = response.data.message;
      if (response.data.success) {
        setMsgs((prev) => [...prev, msg22]);
       
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setcurrentMsg(e.target.value);
  };
  const EnterKeyHandler = (e) => {
    if(!EnterKeySend){
      return;
    }
    if (e.key == "Enter") {
      MessageSend();
    }
  };

  return (
    <>
      <div className="chat-top">
        
        {cancel && (
          <IconButton onClick={() => cancel(false)}>
            <ArrowBackIosRoundedIcon></ArrowBackIosRoundedIcon>
          </IconButton>
        )}

        <div>
          <Avatar src={activeUser?.profilePicture}></Avatar>
          {activeUser?.firstname + " " + activeUser?.lastname}
        </div>

        <div className="chat-top-options">
          <MoreVertIcon></MoreVertIcon>
        </div>
      </div>

      <div className="chat-body" ref={chatbodyref}>
        {msgs.map((msg) => (
          <Message msg={msg} owner={msg.sender == userDB.username}></Message>
        ))}
      </div>

      <div className="chat-bottom">
        <IconButton 
        style={{
          backgroundColor: "aliceblue",
        }}
        >
          <Tooltip title="Enter key to Send">
            {EnterKeySend ? (
              <KeyReturn weight="fill" onClick={()=>setEnterKeySend(false)}></KeyReturn>
            ) : (
              <KeyReturn onClick={()=>setEnterKeySend(true)}></KeyReturn>
            )}
          </Tooltip>
        </IconButton>
        <TextField
          multiline
          maxRows={1}
          className="chat-input"
          onChange={handleChange}
          onKeyDown={EnterKeyHandler}
          value={currentMsg}
        ></TextField>
        <div className="chat-input-send" onClick={MessageSend}>
          <ArrowForwardOutlinedIcon></ArrowForwardOutlinedIcon>
        </div>
      </div>
    </>
  );
};

export default Chat;
