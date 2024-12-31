import React, { useEffect, useState } from "react";
import Post from "./Post";
import { useParams } from "react-router-dom";
import axios from "axios";
import path from "../../path";
import ProfileCard from "./ProfileCard";
import { ToastContainer } from "react-toastify";

const PostPage = () => {
  const [data, setData] = useState(false);
  const { id } = useParams();

  const getPost = async () => {
    try {
      const res = await axios.post(`${path}getpost`, {
        postid: id,
      });
      console.log(res);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="postPageContainer">
      <div className="postPage">
        {data && <Post data={data}></Post>}
        <ToastContainer></ToastContainer>
      </div>
    </div>
  );
};

export default PostPage;
