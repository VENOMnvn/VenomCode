import { Button, LinearProgress, Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";
import axios from "axios";
import path from "../../path";
import { useSelector } from "react-redux";
import Edit from "@mui/icons-material/Edit";


const EditProfile = () => {
  const user = useSelector(s=>s.user.userDB);

  const imageRef = useRef();
  const [imageState, setimageState] = useState("");
  const [image,setImage] = useState("");
  const [exp,setExp] = useState(user.exp);
  const [editExp,seteditExp] = useState(false);
  const [about,setabout] = useState(user.bio);
  const [editAbout,seteditAbout] = useState(false);
  const [desig,setdesig] = useState(user?.designation);
  const [editdesig,seteditdesig] = useState(false);
  const [load,setload] = useState(false);
  const [err,seterr] = useState("");
  const [location,setLocation] = useState(user.city);
  const [editLoc ,setEditLoc] = useState(false);

  const submitHandler = async ()=>{

    
    if((editAbout && !about) || (editdesig && !desig) || (editExp && !exp)){
      seterr("Empty Field")
      return;
    }
    seterr("");
    setload(true);
      try{
        if(image){
        const data = new FormData();
        data.append("file",image);
        data.append("upload_preset","venomcodetrial");
        const imageResponse = await axios.post('http://api.cloudinary.com/v1_1/dcnvvzsdh/image/upload',data);
        console.log(imageResponse);
        if(imageResponse.data.url){
          const res = await axios.post(`${path}editprofile`,{profileURL:imageResponse.data.url,
          user:user?._id,
          exp,
          designation:desig,
          bio:about,
          city:location
          });
          console.log(res);
          window.location.reload();
        }
        }else{

            const res = await axios.post(`${path}editprofile`,{
            user:user?._id,
            exp,
            designation:desig,
            bio:about,
            city:location
            });
            console.log(res);
            window.location.reload();
        }
        
      }catch(Err){
        console.log(Err);
      }
      setload(false);
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


        {
          imageState ? <div className="login-box-field">
        <div>
          <img className="preview-Image" src={imageState}></img>
        </div>
        </div>
        :""
        }


         <div className="login-box-field">
          <p>Experience</p>
          {
            editExp ? <input type="number" value={exp} onChange={e=>setExp(e.target.value)} placeholder="Enter Your Exprience"></input> 
            :
            <>
          <div className="editprofile-div">{
            exp
          }
          <Tooltip>
           <Edit sx={{color:"gray"}} onClick={()=>seteditExp(1)}></Edit>
          </Tooltip>
          </div>
            </>
          }
        </div>

        <div className="login-box-field">
          <p>About</p>
          {
            editAbout ? <input type="text" value={about} onChange={e=>setabout(e.target.value)} placeholder="Enter Your About"></input> 
            :
            <>
          <div className="editprofile-div">
          {about}
          <Tooltip>
           <Edit sx={{color:"gray"}} onClick={()=>seteditAbout(1)}></Edit>
          </Tooltip>
          </div>
            </>
          }
        </div>

        <div className="login-box-field">
          <p>Designation</p>
          {
            editdesig ? <input type="text" value={desig} onChange={e=>setdesig(e.target.value)} placeholder="Your Proffesion"></input> 
            :
            <>
          <div className="editprofile-div">{user?.designation}
          <Tooltip>
           <Edit sx={{color:"gray"}} onClick={()=>seteditdesig(1)}></Edit>
          </Tooltip>
          </div>
            </>
          }
        </div>

        <div className="login-box-field">
          <p>Location</p>
          {
            editLoc ? <input type="text" value={location} onChange={e=>setLocation(e.target.value)} placeholder="Your City / Country"></input> 
            :
            <>
          <div className="editprofile-div">{user?.city}
          <Tooltip>
           <Edit sx={{color:"gray"}} onClick={()=>setEditLoc(1)}></Edit>
          </Tooltip>
          </div>
            </>
          }
        </div>




        <div className="login-box-error">{err}</div>
        <div
          className="signin-button"
          style={{ justifyContent: "center", paddingBottom: "20px" }}
        >
        <Button variant="outlined" onClick={submitHandler} disabled={load}>Upload</Button>
        </div>
      </div>
      {
      load && <LinearProgress></LinearProgress>
    }
    </div>
  );
};

export default EditProfile;
