import Send from "@mui/icons-material/Send";
import { Avatar, IconButton, TextField, Tooltip } from "@mui/material";
import { TextInput } from "keep-react";
import {Share,Notepad,ChatDots} from 'phosphor-react';
import { useState } from "react";
import { useSelector } from "react-redux";
import Popup from './../common/popup';
import CreatePostPopup from "../common/CreatePost";
import axios from "axios";
import path from "../../path";
import CreatePost from "../problemPage/CreateQuestion";
import { Link } from "react-router-dom";

const SharePostDialouge = ()=>{
    
    const user = useSelector(s => s.user.userDB);
    const [message,setMessage] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [showPopUp,setshowPopUp] = useState(false);
   
    const cancel = ()=>{
        setshowPopUp(false);
    }

    const submitHandler = async ()=>{
        try{
            setMessage("");
            
        }catch(err){
            console.log(err);
        }
    }

    const EnterKeyHandler = (e)=>{
        if(e.keyCode == "13"){
            submitHandler();
        }
    }

    return <>
    <div className="share-post-dialoge">
    {showPopUp?<Popup cancel={cancel} element={<CreatePostPopup cancel={cancel}></CreatePostPopup>}></Popup>:""}
    {showCreate && (
          <Popup
            element={
              <CreatePost cancel={() => setShowCreate(false)}></CreatePost>
            }
            cancel={() => setShowCreate(false)}
          ></Popup>
    )}

    <div className="top">
        <Avatar src={user?.profilePicture}></Avatar>
        <Tooltip title="Send Message as Notification">
        <div className="input-container">
            <input
            placeholder="What you want tell to your Followers"
            className="input-box"
            value={message}
            onChange={e=>setMessage(e.target.value)}
            onKeyDown={EnterKeyHandler}
            >
            </input>
            <IconButton>
                <Send onClick={submitHandler}></Send>
            </IconButton>
        </div>
        </Tooltip>
    </div>
    <div className="bottom">
        <div onClick={()=>setshowPopUp(1)}>
        <Share size={24} color="#f02849"></Share>
        Share Post 
        </div>
        <div  onClick={() => setShowCreate(true)}>
        <Notepad size={24} color="#45bd62"></Notepad>
        Ask Question ?
        </div>
        <Link to={'/chat'}>
        <div>
        <ChatDots size={24} color="#f7b928"></ChatDots>
        Chat
        </div>
        </Link>
    </div>
    </div>
    </>;
}
export default SharePostDialouge;