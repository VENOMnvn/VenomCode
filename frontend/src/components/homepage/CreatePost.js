import  Button  from "@mui/material/Button";
import { Avatar } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Popup from './../common/popup';
import AbcRoundedIcon from '@mui/icons-material/AbcRounded';
import CreatePostPopup from "../common/CreatePost";
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded'

const CreatePost = ()=>{

    const [showPopUp,setshowPopUp] = useState(false);
    const cancel = ()=>{
        setshowPopUp(false);
    }

    return <div className="create-post">
        {showPopUp?<Popup cancel={cancel} element={<CreatePostPopup cancel={cancel}></CreatePostPopup>}></Popup>:""}
        <h1 style={{fontWeight:"600",fontSize:"16px"}}>Want to share something</h1>
        <h6 style={{color:"gray"}}>Help ro build a community</h6>
        <button variant="contained" onClick={()=>setshowPopUp(true)}>
        <PostAddRoundedIcon></PostAddRoundedIcon>
        Share Code
        </button>
    </div>
}

export default CreatePost;