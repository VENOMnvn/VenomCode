import React, { useEffect, useRef, useState } from "react";
import "./../common/CreatePostpopup.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Chip from "@mui/material/Chip";
import { Button, CircularProgress, LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import path from "./../../path";
import { Link } from "phosphor-react";
import {
  xcodeLight,
  xcodeLightInit,
  xcodeDark,
  xcodeDarkInit,
} from "@uiw/codemirror-theme-xcode";
import { useNavigate } from "react-router-dom";
import { Textarea } from "keep-react";

const CreatePost = ({ cancel }) => {
  const [title, setTitle] = useState(false);
  const user = useSelector((s) => s.user.user);
  const userDB = useSelector((s) => s.user.userDB);
  const [link,setlink] = useState('');
  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const [success, setSuccess] = useState(false);
  const [description,setdiscription] = useState('');

  useEffect(() => {
    if (!user) {
      navigate("/pleaselogin");
    }
  }, []);

  const handleDelete = (e) => {
    const result = label.filter((ele) => ele != e);
    setLabelArray(result);
  };
  const [label, setLabelArray] = useState([]);

  const handleSubmitLabel = (e) => {
    if (e.keyCode == "13") {
      setLabelArray([...label, e.target.value?.toUpperCase()]);
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      return;
    }

    setload(true);

    const response = await axios.post(`${path}newproblem`, {
      label,
      title,
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        designation: userDB.designation,
        profilePicture: userDB.profilePicture,
      },
      link,
      description
    });

    console.log(response);

    if (response.data.success) {
      // cancel();
    } else {
      alert("Some Error Occured Please Try Again later");
    }
    setload(false);
  };

  return (
    <div className="create-post-popup">
      {load && <LinearProgress></LinearProgress>}
      {success ? (
        <div className="success">Success</div>
      ) : (
        <>
          <div className="create-header">
            <div className="create-header-left">
              <Avatar
                sx={{ width: "50px", height: "50px", bgcolor: "teal" }}
                src={userDB?.profilePicture}
              ></Avatar>
              <div>
                <p>{userDB?.firstname + " " + userDB?.lastname}</p>
                <span>{userDB?.username + " || " + userDB?.designation}</span>
              </div>
            </div>
          </div>

          <div className="create-post-form">
            <span>Title of the Question</span>
            <TextField
              id="standard-basic"
              fullWidth
              style={{
                backgroundColor: "whitesmoke",
                margin: "10px 0px",
                marginBottom: "15px",
              }}
              onChange={(e) => setTitle(e.target.value)}
              variant="standard"
              className="fullwidth"
              placeholder="Example : Solution of Coin Exchange"
            />
            <span>Describe your Question</span>
            <Textarea
              value={description}
              onChange={(e)=>setdiscription(e.target.value)}
              placeholder="I want to do it without DP, And I attached the link of leetcode Also My solution is there"
              style={{
                backgroundColor: "whitesmoke",
                margin: "10px 0px",
                marginBottom: "15px",
              }}
            ></Textarea>
          </div>


          <div className="labels-form-create-post">
            <TextField
              style={{
                margin:"14px 0px"
              }}
              value={link}
              onChange={(e)=>setlink(e.target.value)}
              label="Reference of the Question"
              placeholder="http://www.leetcode.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Link />
                  </InputAdornment>
                ),
              }}
            ></TextField>
          </div>

          <div className="labels-form-create-post">
            <TextField
              id="input-with-icon-textfield"
              label="Tags / Multiple Values"
              placeholder="Type 'DP' and press Enter"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            //   variant="standard"
              onKeyDown={handleSubmitLabel}
            />
            <div className="labels-form-create-post-left">
              {!label
                ? ""
                : label.map((ele) => (
                    <Chip
                      label={ele}
                      variant="outlined"
                      onDelete={() => handleDelete(ele)}
                    />
                  ))}
            </div>
          </div>

          <div className="submit-post">
            <Button variant="outlined" onClick={handleSubmit} disabled={load}>
              {load ? <CircularProgress></CircularProgress> : "Ask"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePost;
