import  Button  from "@mui/material/Button";
import { Avatar } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import Popup from './../common/popup';
import CreatePostPopup from "../common/CreatePost";

const CreatePost = ()=>{
    const [showPopUp,setshowPopUp] = useState(false);
    const cancel = ()=>{
        setshowPopUp(false);
    }

    return <div className="create-post">
        {showPopUp?<Popup cancel={cancel} element={<CreatePostPopup></CreatePostPopup>}></Popup>:""}
        <h1 style={{fontWeight:"600",fontSize:"16px"}}>Want to share something</h1>
        <h6>Help ro build a community</h6>
        <Button variant="contained" onClick={()=>setshowPopUp(true)}>Share Code</Button>
    </div>
}

export default CreatePost;