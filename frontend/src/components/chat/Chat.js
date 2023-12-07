import React, { useEffect, useRef, useState } from "react";
import profile from "./../../static/profile.jpeg";
import { Avatar } from "@mui/material";
import { TextField } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import Message from "./Message";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useSelector } from "react-redux";
import axios from "axios";
import path from "../../path";

const Chat = ({ data }) => {

  const [msgs, setMsgs] = useState(data.messages);
  const [currentMsg, setcurrentMsg] = useState("");
  const userDB = useSelector((s) => s.user.userDB);
  const chatbodyref = useRef();



  const [activeUser, setActiveUser] = useState(0);

  useEffect(() => {
    data?.users?.forEach((user) => {
      if (user.username != userDB.username) {
        setActiveUser(user);
      }
    });
  }, [data]);

  useEffect(()=>{
    setMsgs(data.messages);
  },[data]);


  useEffect(()=>{
    let element = chatbodyref.current;
    element.scrollTop = element.scrollHeight;
  },[msgs])

  const MessageSend = async () => {
    try {
      const response = await axios.post(path + "message", {
        msg: currentMsg,
        chatID: data._id,
        sender: userDB.username,
        userID: userDB._id,
      });

      let msg22 = response.data.message;

      if (response.data.success) {
        setMsgs((prev) => [...prev, msg22]);
        setcurrentMsg("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setcurrentMsg(e.target.value);
  };

  return (
    <>
      <div className="chat-top">
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
        <p>
          <AddReactionIcon></AddReactionIcon>
        </p>
        <TextField
          multiline
          maxRows={1}
          className="chat-input"
          onChange={handleChange}
          value={currentMsg}
        ></TextField>
        <div className="chat-input-send" onClick={MessageSend}>
          <ArrowForwardOutlinedIcon></ArrowForwardOutlinedIcon>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Chat;
