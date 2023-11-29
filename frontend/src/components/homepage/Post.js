import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as React from "react";
import Stack from "@mui/material/Stack";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import profile from "./../../static/profile.jpeg";
import axios from "axios";
import path from "../../path";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ShareIcon from "@mui/icons-material/Share";
import CodeMirror from "@uiw/react-codemirror";
import { basicDark } from "@uiw/codemirror-theme-basic";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@uiw/react-codemirror";
import { MenuItem, Menu } from "@mui/material";
import {
  Avatar,
  ListItem,
  TextField,
  Tooltip,
  typographyClasses,
} from "@mui/material";

import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import { useSelector } from "react-redux";
import { useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import {
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  List,
} from "@mui/material";

// import { Popup } from '@mui/base/Unstable_Popup/Popup';
import Popup from "../common/popup";

const CommentComponent = ({ data }) => {
  console.log(data);
  return (
    <>
      <div className="comment-component">
        <div className="comment-headline">{data.length} Comments</div>
        <div className="comment-list-container">
          <List>
            {data.map((cmmnt) => (
              <Link to={`/user/${cmmnt.user.username}`}>
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar src={cmmnt.user.profilePicture}></Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={cmmnt.user.firstname}
                    secondary={cmmnt.comment}
                  ></ListItemText>
                </ListItemButton>
              </Link>
            ))}
          </List>
        </div>
      </div>
    </>
  );
};

const Post = (props) => {
  const [data, setData] = useState(props.data);
  const [time, setTime] = React.useState("");
  const user = useSelector((s) => s.user.user);
  const UserDB = useSelector((s) => s.user.userDB);
  const [savePostLoad, setSavePostLoad] = useState(false);
  const [postCreator, setPostCreator] = useState(data.user);
  const [commentText, setCommentText] = useState("");
  const [commnentPopup, setCommentPopup] = useState(false);
  const [commentInputshow, setCommentInput] = React.useState(false);
  const [BOOK, setBOOK] = useState(false);

  const [showMenu, setshowMenu] = useState(false);
  const [showlabel, setshowlabel] = useState(false);

  const menuRef = React.useRef();
  const labelButtonRef = React.useRef();

  // const code = data ? data.postCode?.split(/\n/g) : "";

  React.useEffect(() => {
    console.log(data.label);
    const date2 = new Date(data.createdAt);
    setTime(date2.toLocaleTimeString() + " " + date2.toLocaleDateString());

    // if(diffTime>14400){
    // }
    // else if(diffTime>3600){
    //   console.log("1");
    //    setTime((diffTime/3600).toFixed() + " Hours Ago");
    // }
    // else if(diffTime>60){
    //   console.log("2");

    //    setTime(setTime((diffTime/60).toFixed() + " Mins Ago"));
    // }else{
    //   console.log("3");
    //   setTime(setTime((diffTime).toFixed() + " Seconds Ago"));
    // }
  }, []);

  const submitComment = async () => {
    if (commentText.length == 0) {
      return;
    }
    if (!user) {
      toast.info("Please Sigin First ");
      return;
    }
    try {
      const res = axios.post(`${path}comment`, {
        postid: data._id,
        user: {
          username: user.username,
          profilePicture: user.profilePicture,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        commentText,
      });

      setCommentText("");
      toast.info("Comment posted");
      getPost();
    } catch (err) {}
  };

  const getPost = async () => {
    try {
      const res = await axios.post(`${path}getpost`, {
        postid: data._id,
      });
      console.log(res);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addLike = async () => {
    if (!user) {
      toast.info("Please Sigin First to Login");
      return;
    }
    const response = await axios.post(`${path}addlike`, {
      user: user._id,
      post: data._id,
    });

    if (response.data.success) {
      getPost();
    }
  };

  const getCreatorPost = async () => {
    try {
      const response = await axios.get(
        `${path}getUser?username=${postCreator.username}`
      );
      if (response.data.success) {
        setPostCreator(response.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const savePost = async () => {
    setSavePostLoad(true);
    try {
      const response = await axios.post(`${path}savepost`, {
        user: user._id,
        post: data._id,
      });
      console.log(response);
      setBOOK(true);
    } catch (err) {}
    setSavePostLoad(false);
  };

  React.useEffect(() => {
    getCreatorPost();
    UserDB?.savedpost?.forEach((ele) => {
      if (ele?._id == data?._id) {
        setBOOK(true);
      }
    });
  }, []);

  return (
    <div className="post">
      {commnentPopup ? (
        <Popup
          cancel={() => setCommentPopup(false)}
          heading={"Comments"}
          wid={"400px"}
          element={<CommentComponent data={data.comments}></CommentComponent>}
        ></Popup>
      ) : (
        ""
      )}

      <ToastContainer></ToastContainer>
      <div className="post-head">
        <Avatar src={postCreator?.profilePicture}></Avatar>
        <div className="post-head-details">
          <p>{data?.user?.firstname + " " + data?.user?.lastname}</p>
          <span>
            {" @" +
              postCreator?.username +
              " ||         " +
              postCreator?.designation}
          </span>
          <span>{time}</span>
        </div>
        <Menu
          open={showMenu}
          anchorEl={menuRef.current}
          onClose={() => setshowMenu(false)}
          dense
          sx={{
            borderTopLeftRadius: 0,
          }}
        >
          <MenuItem ref={labelButtonRef} onClick={() => setshowlabel(true)}>
            <ListItemText>Show Labels</ListItemText>
          </MenuItem>

          <MenuItem>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemText>Report</ListItemText>
          </MenuItem>
        </Menu>

        <Menu
          open={showlabel}
          anchorEl={labelButtonRef.current}
          onClose={() => setshowlabel(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        > <MenuItem>
            <ul>
              {data.label?.map((ele)=>{<li>  
              "Naveen"
              </li>
              })}
              <li>
                "nn"
              </li>
            </ul>
          </MenuItem>
        </Menu>

        <div
          className="post-head-tools"
          ref={menuRef}
          onClick={() => setshowMenu(true)}
        >
          <MoreHorizIcon></MoreHorizIcon>
        </div>
      </div>
      <div className="post-body">
        <span>{data?.title}</span>

        <div>
          {/* {code.map((ele) => (
            <p>{ele}</p>
          ))} */}
          <CodeMirror
            value={data?.postCode}
            style={{ maxHeight: "600px" }}
            theme={basicDark}
            extensions={[langs.cpp(), EditorView.editable.of(false)]}
            readOnly
          ></CodeMirror>
        </div>
      </div>
      <div className="post-lower">
        <div className="post-lower-count">
          <Tooltip>
            <p style={{ color: "#0b2239" }}>
              {data?.likes?.length + " "}
              <span>supports</span>
            </p>
          </Tooltip>
          <Tooltip title="see Comments">
            <p>
              {data?.comments?.length + " "}
              <span>comments</span>
            </p>
          </Tooltip>
        </div>
        <div className="post-lower-group">
          <div>
            <Button
              variant="text"
              startIcon={
                <KeyboardDoubleArrowUpIcon></KeyboardDoubleArrowUpIcon>
              }
              onClick={addLike}
              sx={{ color: "gray" }}
            >
              {window.outerWidth > 600 && "Vote"}
            </Button>
          </div>
          <div
            onClick={() => {
              setCommentInput((prev) => !prev);
            }}
          >
            <Tooltip title="add comment">
              <Button
                variant="text"
                startIcon={<AddCommentIcon></AddCommentIcon>}
                sx={{ color: "gray" }}
              >
                {window.outerWidth > 600 && "Comments"}
              </Button>
            </Tooltip>
          </div>

          <div>
            {BOOK ? (
              <>
                <Button
                  variant="text"
                  startIcon={
                    <BookmarkAddedRoundedIcon></BookmarkAddedRoundedIcon>
                  }
                  style={{
                    color: "green",
                  }}
                >
                  {window.outerWidth > 600 && "Saved"}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setSavePostLoad(true);
                  savePost();
                }}
                variant="text"
                disabled={savePostLoad}
                startIcon={<BookmarkBorderIcon></BookmarkBorderIcon>}
                sx={{ color: "gray" }}
              >
                {window.outerWidth > 600 && "Save"}
              </Button>
            )}
          </div>

          <div>
            <Link to={`/post/${data._id}`}>
              <Button
                variant="text"
                startIcon={<ShareIcon></ShareIcon>}
                sx={{ color: "gray" }}
              >
                {window.outerWidth > 600 && "Share"}
              </Button>
            </Link>
          </div>
        </div>
        {commentInputshow ? (
          <>
            {data?.comments?.length > 0 ? (
              <>
                <div className="comment-Box">
                  <div className="comment-Box-image">
                    <img
                      src={
                        data?.comments[data.comments.length - 1].user
                          .profilePicture
                      }
                    ></img>
                  </div>
                  <div>
                    <p>
                      {data?.comments[data.comments.length - 1].user.firstname}
                    </p>
                    <span>
                      {data?.comments[data.comments.length - 1].comment}
                    </span>
                  </div>
                </div>
                <a
                  style={{ padding: "10px" }}
                  onClick={() => setCommentPopup(true)}
                >
                  View all comments
                </a>
              </>
            ) : (
              ""
            )}
            <div className="comment-edit">
              <span>
                <Avatar src={UserDB?.profilePicture}></Avatar>
              </span>
              <input
                type="text"
                placeholder="Type here"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></input>
              <span onClick={submitComment}>
                <SendIcon sx={{ color: "#cdcfd0" }}></SendIcon>
              </span>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default Post;
