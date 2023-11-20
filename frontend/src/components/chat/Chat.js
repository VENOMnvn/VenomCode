import React, { useState } from 'react'
import profile from './../../static/chat.jpg';
import { Avatar } from '@mui/material';
import {TextField} from '@mui/material';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Message from './Message';
const Chat = () => {
  const [msgs,setMsgs] = useState(["Hellp","how r u","good","and You","also fine ","And I am also fine so what about you","Nothing","My name is Naveen","and yours","And then who is sonu","He is No one","and your","Aur btao","Bss badhiya"]);
  const [currentMsg,setcurrentMsg] = useState("");

  const MessageSend = ()=>{
      setMsgs([currentMsg,...msgs])
      setcurrentMsg("");
  }
  const handleChange = (e)=>{
    setcurrentMsg(e.target.value);
  };

  return (<>
    <div className='chat-top'>
        <div>
            <Avatar src={profile}></Avatar>
            Sonu
        </div>
     
        <div>
            I
        </div>
    </div>

    <div className='chat-body'>
      {msgs.map((ele)=><Message msg={ele} owner={Math.random()>0.5}></Message>)}
    </div>

    <div className='chat-bottom'>
        <p><AddReactionIcon></AddReactionIcon></p>
        <TextField multiline maxRows={1} className='chat-input' onChange={handleChange} value={currentMsg}></TextField>
        <div className='chat-input-send' onClick={MessageSend}>
        <ArrowForwardOutlinedIcon></ArrowForwardOutlinedIcon>
        </div>
        <div></div>
    </div>
  </>
  )
}

export default Chat;