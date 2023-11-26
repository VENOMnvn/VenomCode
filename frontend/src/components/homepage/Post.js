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
import {
  Avatar,
  ListItem,
  TextField,
  Tooltip,
  typographyClasses,
} from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
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
              <ListItemButton>
                <ListItemAvatar>
                  <Avatar src={cmmnt.user.profilePicture}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={cmmnt.user.firstname}
                  secondary={cmmnt.comment}
                ></ListItemText>
              </ListItemButton>
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
  const [commentText, setCommentText] = useState("");

  const [commnentPopup, setCommentPopup] = useState(false);
  const [commentInputshow, setCommentInput] = React.useState(false);
  const code = data ? data.postCode?.split(/\n/g) : "";

  React.useEffect(() => {
    const date1 = new Date();
    const date2 = new Date(data.createdAt);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMins = Math.ceil(diffTime / (1000 * 60));

    if (diffMins > 60) {
      setTime(diffDays + " Hours Ago");
    } else {
      setTime(diffMins + " mins Ago");
    }
  }, []);

  const submitComment = async () => {
    if(commentText.length==0){
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
      console.log(res);
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
    const response = await axios.post(`${path}addlike`, {
      user: user._id,
      post: data._id,
    });
    if (response.data.success) {
      getPost();
    }
  };

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
        <Avatar src={profile}></Avatar>
        <div className="post-head-details">
          <p>{data?.user?.firstname + " " + data?.user?.lastname}</p>
          <span>{data?.user?.designation}</span>
          <span>{time}</span>
        </div>
        <div className="post-head-tools">
          <MoreHorizIcon></MoreHorizIcon>
        </div>
      </div>
      <div className="post-body">
        <span>{data.title}</span>
        <div>
          {code.map((ele) => (
            <p>{ele}</p>
          ))}
        </div>
      </div>
      <div className="post-lower">
        <div className="post-lower-count">
          <Tooltip>
            <p style={{ color: "#0b2239" }}>
              {data?.likes.length + " "}
              <span>supports</span>
            </p>
          </Tooltip>
          <Tooltip title="see Comments">
            <p >
              {data.comments?.length + " "}
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
              Vote
            </Button>
          </div>
          <div>
            <Tooltip title="add comment">
              <Button
                variant="text"
                startIcon={<AddCommentIcon></AddCommentIcon>}
                onClick={()=>setCommentInput(!commentInputshow)}
                sx={{ color: "gray" }}
              >
                Comment
              </Button>
            </Tooltip>
          </div>
          <div>
            <Button
              variant="text"
              startIcon={<BookmarkBorderIcon></BookmarkBorderIcon>}
              sx={{ color: "gray" }}
            >
              Save
            </Button>
          </div>
          <div>
            <Button
              variant="text"
              startIcon={<ShareIcon></ShareIcon>}
              sx={{ color: "gray" }}
            >
              Share
            </Button>
          </div>
        </div>
        {commentInputshow ? (
          <>
            {   data.comments?.length>0?
            <>
            <div className="comment-Box">
                <div className="comment-Box-image">
                    <img src={data.comments[data.comments.length-1].user.profilePicture}></img>
                </div>
                <div>
                    <p>{data.comments[data.comments.length-1].user.firstname}</p>
                    <span>{data.comments[data.comments.length-1].comment}</span>
                </div>
            </div>
            <a style={{padding:"10px"}}   onClick={() => setCommentPopup(true)} >View all comments</a>
            </>
            
              :""
            }
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
