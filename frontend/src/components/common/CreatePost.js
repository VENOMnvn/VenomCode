import React, { useRef, useState } from "react";
import "./CreatePostpopup.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Chip from '@mui/material/Chip';
import { Button, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import axios from 'axios'
import path from './../../path';
import {useNavigate} from 'react-router-dom';

const CreatePost = ({cancel}) => {

  const [title,setTitle] = useState(false);
  const user = useSelector(s=>s.user.user);
  const [code,setCode] = useState(false);
  const navigate = useNavigate();
  const [load,setload] = useState(false);
  const [success,setSuccess] = useState(false);

  const handleDelete=(e)=>{
    console.log(e);
    const result = label.filter((ele)=>ele != e.target.innerHTML);
    setLabelArray(result);
}

    const [label,setLabelArray] = useState(["DSA"]);
    
    const handleSubmitLabel = (e)=>{
      if(e.code == "Enter"){
        setLabelArray([...label,e.target.value?.toUpperCase()]);
        e.target.value="";
      }
    }
    
    const handleSubmit = async ()=>{
      if(!user){
        return;
      }
        setload(true);
        const response = await axios.post(`${path}sharepost`,{
          label,title,code,user:{
            _id : user._id,
            firstname:user.firstname,
            lastname:user.lastname,
            designation:user.designation,
            profilePicture:"URL"
          }
        });
        
        console.log(response);
        
        if(response.data.success){
          console.log("Navigating now")
          navigate("/home");
          // setSuccess(true);
          // setTimeout(()=>{
          //   setSuccess(false);
          //   cancel();
          // },1000);
          
        }else{
          alert("Some Error Occured Please Try Again later");
        }
        setload(false);
    };

  return (
    <div className="create-post-popup">
    {
      load && <LinearProgress></LinearProgress>
    }
    {
      success ? <div className="success">Success</div>
      :
      <>

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
        <Button variant="outlined" onClick={handleSubmit} disabled={load}>Upload</Button>
      </div>
      </>
    }
    </div>
  );
};

export default CreatePost;
