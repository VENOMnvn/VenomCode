import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import * as React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Button from "@mui/material/Button";
import axios from "axios";
import path from "../../path";
import { useEffect } from "react";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ShareIcon from "@mui/icons-material/Share";
import CodeMirror from "@uiw/react-codemirror";
import { basicDark } from "@uiw/codemirror-theme-basic";
import { langs } from "@uiw/codemirror-extensions-langs";
import { EditorView } from "@uiw/react-codemirror";
import {
  MenuItem,
  Menu,
  Avatar,
  Tooltip,
  IconButton,
  Icon,
} from "@mui/material";
import BookmarkAddedRoundedIcon from "@mui/icons-material/BookmarkAddedRounded";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Tag } from "phosphor-react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import SendIcon from "@mui/icons-material/Send";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Dropdown } from "keep-react";
import { ChatTeardropDots, Book } from "phosphor-react";
import "react-toastify/dist/ReactToastify.css";
import {
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  List,
} from "@mui/material";
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
  const id = props.id;
  const [data, setData] = useState(props.data);
  const [time, setTime] = React.useState("");
  const user = useSelector((s) => s.user?.user);
  const UserDB = useSelector((s) => s.user?.userDB);
  const [savePostLoad, setSavePostLoad] = useState(false);
  const [postCreator, setPostCreator] = useState(data?.user);
  const [commentText, setCommentText] = useState("");
  const [commnentPopup, setCommentPopup] = useState(false);
  const [commentInputshow, setCommentInput] = React.useState(false);
  const [BOOK, setBOOK] = useState(false);
  const [likeLoading,setLikeLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showMenu, setshowMenu] = useState(false);
  const [showQuestion, setshowQuestion] = useState(false);
  const menuRef = React.useRef();

  // const code = data ? data.postCode?.split(/\n/g) : "";
  useEffect(() => {
    if (data) {
      if (data?.likes?.includes(user._id)) {
        setLiked(true);
      }
    }
  }, [data]);

  React.useEffect(() => {
    const date2 = new Date(data?.createdAt);
    setTime(date2.toLocaleTimeString() + " " + date2.toLocaleDateString());

    // if(diffTime>14400){
    // }
    // else if(diffTime>31090){
    //   .log("1");
    //    setTime((diffTime/31090).toFixed() + " Hours Ago");
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
          userId: user._id,
        },
        commentText,
      });

      setCommentText("");
      toast.promise(res, {
        success: "Comment Posted",
        pending: "posting Comment ...",
        error: "Comment can't posted ! Please Try again",
      });
      getPost();
    } catch (err) {}
  };

  const getPost = async () => {
    try {
      const res = await axios.post(`${path}getpost`, {
        postid: data._id,
      });

      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addLike = async () => {
    setLikeLoading(true);
    if (!user) {
      toast.info("Please Sigin/Login First to Vote UP");
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

  const unsavepost = async () => {
    setSavePostLoad(true);
    try {
      const response = await axios.post(`${path}unsavepost`, {
        user: user._id,
        post: data._id,
      });
      console.log(response);
      if (response.data.success) {
        setBOOK(false);
      }
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
        <Link to={"/user/" + postCreator?.username}>
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
        </Link>

        <div>
          <div
            className="post-head-tools"
            onClick={() => setshowMenu(!showMenu)}
          >
            <IconButton>
              <Tag size={24} weight="duotone"></Tag>
            </IconButton>
          </div>
          {data?.question && (
            <div
              className="post-head-tools mx-2"
              onClick={() => setshowQuestion(!showQuestion)}
            >
              <IconButton>
                <Book size={24} weight="duotone"></Book>
              </IconButton>
            </div>
          )}
        </div>
      </div>
      {showQuestion && (
        <div className="post-label">
          <p>
            Question :{" "}
            <Link
              to={"/problems?question=" + data?.question.questionID}
              
            >
              <span>
              {data?.question?.title}
              </span>
            </Link>
          </p>
        </div>
      )}
      {showMenu && (
        <div className="post-label">
          {data?.label?.length == 0 && "No Labels"}
          {data?.label?.map((tag) => (
            <span>{tag}</span>
          ))}
        </div>
      )}

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
            {liked ? (
              <>
                <Button>
                  <IconButton
                    style={{
                      backgroundColor: "#004E64",
                    }}
                  >
                    <KeyboardDoubleArrowUpIcon
                      style={{
                        color: "white",
                      }}
                    ></KeyboardDoubleArrowUpIcon>
                  </IconButton>

                  {window.outerWidth > 1090 && "Voted"}
                </Button>
              </>
            ) : (
              <Button
                variant="text"
                disabled={likeLoading}
                onClick={addLike}
                sx={{ color: "gray" }}
              >
                <IconButton
                  style={{
                    backgroundColor: "#e4e6eb",
                  }}
                >
                  <KeyboardDoubleArrowUpIcon></KeyboardDoubleArrowUpIcon>
                </IconButton>
                {window.outerWidth > 1090 && "Vote"}
              </Button>
            )}
          </div>

          <div
            onClick={() => {
              setCommentInput((prev) => !prev);
            }}
          >
            <Tooltip title="add comment">
              <Button variant="text" sx={{ color: "gray" }}>
                <IconButton
                  style={{
                    backgroundColor: "#e4e6eb",
                  }}
                >
                  <ChatTeardropDots size={26} />
                  {/* <AddCommentIcon></AddCommentIcon> */}
                </IconButton>
                {window.outerWidth > 1090 && "Comments"}
              </Button>
            </Tooltip>
          </div>

          <div>
            {BOOK ? (
              <>
                <Button
                  variant="text"
                  style={{
                    color: "green",
                  }}
                  onClick={unsavepost}
                >
                  <IconButton
                    style={{
                      backgroundColor: "green",
                    }}
                  >
                    <BookmarkAddedRoundedIcon
                      style={{ color: "white" }}
                    ></BookmarkAddedRoundedIcon>
                  </IconButton>
                  {window.outerWidth > 1090 && "Saved"}
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
                sx={{ color: "gray" }}
              >
                <IconButton
                  style={{
                    backgroundColor: "#e4e6eb",
                  }}
                >
                  <BookmarkBorderIcon></BookmarkBorderIcon>
                </IconButton>
                {window.outerWidth > 1090 && "Save"}
              </Button>
            )}
          </div>

          <div>
            <Link to={`/post/${data?._id}`}>
              <Button
                variant="text"
                sx={{ color: "gray" }}
                onClick={() => {
                  navigator?.clipboard?.writeText(
                    window.location.host + "/post/" + data._id
                  );
                  toast.info("Copied to Clipboard");
                }}
              >
                <IconButton
                  style={{
                    backgroundColor: "#e4e6eb",
                  }}
                >
                  <ShareIcon></ShareIcon>
                </IconButton>
                {window.outerWidth > 1090 && "Share"}
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
