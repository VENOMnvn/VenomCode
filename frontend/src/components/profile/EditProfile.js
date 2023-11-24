import { Button } from "@mui/material";
import React, { useRef, useState } from "react";
import axios from "axios";
import path from "../../path";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const user = useSelector(s=>s.user.user);
  const imageRef = useRef();
  const [imageState, setimageState] = useState("");
  const [image,setImage] = useState("");

  const submitHandler = async ()=>{
      try{

        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","venomcodetrial");
        const imageResponse = await axios.post('http://api.cloudinary.com/v1_1/dcnvvzsdh/image/upload',data);
        console.log(imageResponse);

        if(imageResponse.data.url){
          const res = await axios.post(`${path}editprofile`,{profileURL:imageResponse.data.url,
          user:user?._id
          });
          console.log(res);
        }

      }catch(Err){
        console.log(Err);
      }
  };
  
  const imageChangeHandler =  (e)=>{
    setimageState(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
  }
  return (
    <div className="editProfile">
      <div className="login-box">
        <div className="login-box-title">Edit Your Profile</div>
        <div className="login-box-field">
          <p>Profile Pic</p>
          <div
            className="upload-file centerAll"
            onClick={() => imageRef.current.click()}
          >
            Upload New image
          </div>
          <input
            ref={imageRef}
            type="file"
            style={{ display: "none" }}
            onChange={imageChangeHandler}
          ></input>
        </div>
        <div>
          <img className="preview-Image" src={imageState}></img>
        </div>
        <div className="login-box-error">{}</div>
        <div
          className="signin-button"
          style={{ justifyContent: "center", paddingBottom: "20px" }}
        >
          <Button variant="outlined" onClick={submitHandler} >save</Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
