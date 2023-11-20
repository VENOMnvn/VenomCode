import React, { useRef, useState } from "react";
import "./CreatePostpopup.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Chip from '@mui/material/Chip';
import { Button } from "@mui/material";

const CreatePost = () => {

  const [title,setTitle] = useState("");
  const [code,setCode] = useState("");

  const handleDelete=(e)=>{
    console.log(e);
    const result = label.filter((ele)=>ele != e.target.innerHTML);
    setLabelArray(result);
}

    const [label,setLabelArray] = useState(["Leetcode"]);
    
    const handleSubmitLabel = (e)=>{
      if(e.code == "Enter"){
        setLabelArray([...label,e.target.value]);
        e.target.value="";
      }
    }

    const handleSubmit = async ()=>{
        
    };

  return (
    <div className="create-post-popup">
      <div className="create-header">
        <div className="create-header-left">
          <Avatar sx={{ width: "50px", height: "50px", bgcolor: "teal" }}>
            NC
          </Avatar>
          <div>
            <p>Naveen Chaudhary</p>
            <span>Web Developer</span>
          </div>
        </div>
      </div>
      <div className="create-post-form">
        <TextField
          id="standard-basic"
          fullWidth
          onChange={(e)=>setTitle(e.target.value)}
          label="Problem Statement"
          variant="standard"
          className="fullwidth"
          placeholder="Example : Flatten the Tree into Linked list"
        />
        <span>Describe your Code title or prblem Statement </span>
        <TextField
          id="standard-multiline-flexible"
          label="Code "
          multiline
          onChange={(e)=>setCode(e.target.value)}
          maxRows={12}
          variant="standard"
          placeholder="example : #include <stdio.h>"
          style={{marginTop:"12px"}}
        />
      </div>
      <div className="labels-form-create-post">
      <TextField
        id="input-with-icon-textfield"
        label="Labels to Filter"
        placeholder="example:Leetcode"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
        onKeyDown={handleSubmitLabel}
      />
      <div className="labels-form-create-post-left">
      {!label?"":label.map((ele)=><Chip label={ele} variant="outlined" onClick={handleDelete}/>)}
      </div>
      </div>

      <div className="submit-post">
        <Button variant="outlined" onClick={handleSubmit}>Upload</Button>
      </div>
    </div>
  );
};

export default CreatePost;
