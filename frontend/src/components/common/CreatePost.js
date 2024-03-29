import React, { useEffect, useRef, useState } from "react";
import "./CreatePostpopup.css";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Chip from "@mui/material/Chip";
import { Button, CircularProgress, IconButton, LinearProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {Tag} from 'phosphor-react';
import path from "./../../path";
import CodeMirror from "@uiw/react-codemirror";
import { basicLight } from "@uiw/codemirror-theme-basic";
import { langs } from "@uiw/codemirror-extensions-langs";
import {
  xcodeLight,
} from "@uiw/codemirror-theme-xcode";
import { useNavigate } from "react-router-dom";
import {removeQuestion} from './../../utils/slices/utilitySlice';

const CreatePost = ({ cancel }) => {
  const [title, setTitle] = useState(false);
  const user = useSelector((s) => s.user.user);
  const ques = useSelector((s) => s.utility.questionID);
  const userDB = useSelector((s) => s.user.userDB);
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const [load, setload] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

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
  const deletLabel = (e) => {};

  const handleSubmit = async () => {
    if (!user) {
      return;
    }
    setload(true);
    const response = await axios.post(`${path}sharepost`, {
      label,
      title,
      code,
      question:ques,
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        designation: user.designation,
        profilePicture: "URL",
      },
    });

    console.log(response);

    if (response.data.success) {
      cancel();
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
          {
            ques &&  <span style={{ color: "gray", margin: "4px 12px" }}>
            You are answering question <b>{ques?.title}</b>. dont want to answer ?{" "}
            <a
              style={{
                textDecoration: "underline",
                cursor:"pointer"
              }}
              onClick={()=>dispatch(removeQuestion())}
            >

              remove
            </a>{" "}
          </span>

          }
          <div className="create-post-form">
            <span>Problem Statement</span>
            <TextField
              id="standard-basic"
              fullWidth
              onChange={(e) => setTitle(e.target.value)}
              sx={{
                backgroundColor: "whitesmoke",
              }}
              className="fullwidth"
              placeholder="Example : Flatten the Tree into Linked list"
            />
            <span>Write the Code Below</span>
            <CodeMirror
              value={code}
              height="400px"
              style={{
                border:"1px solid lightgray",
                borderRadius:"2px"
              }}
              onChange={(editor, state) => {
                setCode(editor);
              }}
              theme={xcodeLight}
              extensions={[langs.cpp()]}
            ></CodeMirror>
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
             sx={{
              backgroundColor:"whitesmoke",
              margin:"6px 0px"
             }}
              onKeyDown={handleSubmitLabel}
            />
            <div className="labels-form-create-post-left">
              <IconButton>
             <Tag></Tag>
              </IconButton>
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
              {load ? <CircularProgress></CircularProgress> : "Upload"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CreatePost;
