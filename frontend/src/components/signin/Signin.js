import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import "./signin.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Chip } from "@mui/material";
import { Badge } from "@mui/base";
import {DatePicker} from 'keep-react'
import path from "../../path";
import axios from "axios";
import { addUser } from "../../utils/slices/userSlice";
import {useDispatch} from 'react-redux';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signin = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  const [otp,setOtp] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [username, setusername] = useState("");
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setgender] = useState("male");
  const [designation, setdesignation] = useState("");
  const [organisation, setorganisation] = useState("");
  const [city, setcity] = useState("");
  const [skills, setskills] = useState([]);
  const [load,setload] = useState(false);
  const [disabled,setDisabled] = useState(true);
  const [isUserUnique,setUserUnique] = useState(true);
  const [aSkill,setASkill] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
   
  const skillselecthandle = (e) => {
    console.log(e);
    if (e.keyCode == "13") {
      if (e.target.value.length > 0)
        setskills([...skills, e.target.value.toUpperCase().trim()]);
      e.target.value = "";
      setASkill("");
    }
  };

  const deleteSkill = (e)=>{
    let skillTemp = skills;
    skillTemp = skillTemp.filter((ele)=>{
      return ele != e;
    })
    console.log(skillTemp);
    setskills(skillTemp);
    return;
  }

  const validate = () => {
    if (!emailRegex.test(email) && email.length > 0) {
      setError("Enter a Valid Email");
      return false;
    }
    if (!passwordRegex.test(password) && password.length > 0) {
      console.log(password);
      setError("Enter password with a capital letter,small,Number and symbol");
      return false;
    }
    if (password != confirm) {
      setError("Password didnt match with confirm");
      return false;
    }
    setError("");
    return true;
  };

  const isEmpty = () => {
    if (
      !username ||
      !email ||
      !password ||
      !firstname ||
      !lastname ||
      !dob ||
      !designation ||
      skills.length == 0
    ) {
      setError("Mandatory field is Empty. Fill up and try again");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmitOtp = (e)=>{
     console.log(e);

     if(e.target.value == ''){
      setOtp('');
     }
     if(e.target.value.length <=6 && e.target.value.slice(-1)>='0' && e.target.value.slice(-1)<='9'){
      console.log("run")
      setOtp(e.target.value);
     }

  };

  const handleSubmitSignin = async ()=>{
     if(otp.length<6){
      toast.error("OTP should be 6 digit");
      return;
     }

      setload(true);
      try{

          const response = await axios.post(`${path}signin`,{
          email,
          otp,
          username,
          password,
          firstname,
          gender,
          lastname,
          dob,
          designation,
          skills,
          city,
          organisation
        });

        console.log(response);

        if(response.data.success){
            dispatch(addUser(response.data.msg));
            navigate('../');
            setError("");
        }
        else{
          toast.error(response.data.msg);
          setError(response.data.msg)
        }
      }
      catch(err){
        console.log(error);
      }

      setload(false);
  };


  const submitHandler = async () => {
    // if (validate() && isEmpty() && isUserUnique) {
      if(1){

      setload(true);
      const res = await axios.post(`${path}register`, {
        email
      });
      console.log(res);
      if(res.data.success){
        setActiveStep(3);
      }
      setload(false);
    }
    else{
      toast.error("Please ! Fill correct details");
    }
  };

  

  const userNameChangeHandler = async ()=>{
      try{
          const response = await axios.get(`${path}getUserName?user=${username}`);
          console.log(response);

          if(!response.data.isUserUnique){
            toast.error("Username is not available",{
              className: "toast-message"
            });
          }else{
            toast.success("Username is available");
          }

          setUserUnique(response.data.isUserUnique);
      }
      catch(err){
        toast.error("Error Occured in Fetchin Username");
      }
  };

  return (
    <div className="signin">
    {load && <LinearProgress></LinearProgress>}
      <ToastContainer></ToastContainer>
      <div className="stepper largeScreen">
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel>Register</StepLabel>
          </Step>
          <Step>
            <StepLabel>Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Submit</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify</StepLabel>
          </Step>
        </Stepper>
      </div>
      
      <div className="stepper smallScreen">
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
        <Step>
          <StepLabel></StepLabel>
        </Step>
      </Stepper>
    </div>

      

      <div className="signin-button">
        <Button
          sx={{ color: "black" }}
          disabled={activeStep == 0}
          startIcon={<ArrowBackIosIcon></ArrowBackIosIcon>}
          onClick={() => setActiveStep(activeStep - 1)}
        >
          Back
        </Button>
      </div>

      <div className="signin-body">
        {activeStep == 0 ? (
          <>
            {/* First Paenel */}
            <div className="login-box">
              <div className="login-box-title">Welcome</div>
              <div className={isUserUnique?"login-box-field":"login-box-field invalid-user"}>
                <p>Username</p>
                <input
                  value={username}
                  onChange={(e) => setusername(e.target.value?.toLowerCase())}
                  onBlur={()=>{ 
                    validate()
                    userNameChangeHandler()
                    }}
                  placeholder="Choose a unique username"
                ></input>
              </div>

              <div className="login-box-field">
                <p>Email</p>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validate}
                ></input>
              </div>

              <div className="login-box-field">
                <p>Password</p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validate}
                ></input>
              </div>
              <div className="login-box-field">
                <p>Verify</p>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setconfirm(e.target.value)}
                  onBlur={validate}
                ></input>
              </div>

              <div className="login-box-error">{error}</div>
              <div className="login-box-link">Have a Account ? Login <Link to='/login'>here</Link></div>
            </div>

            
            <div className="login-side-display"></div>
          </>
        ) : // second panel
        activeStep == 1 ? (
          <>
            <div className="login-box">
              <div className="login-box-title">Tell us more</div>
              <div className="login-box-field">
                <p>First Name</p>
                <input
                  value={firstname}
                  onChange={(e) => setfirstname(e.target.value)}
                  placeholder=""
                ></input>
              </div>
              <div className="login-box-field">
                <p>Last name</p>
                <input
                  value={lastname}
                  onChange={(e) => setlastname(e.target.value)}
                ></input>
              </div>

              <div className="login-box-field">
                <p>Date of Birth</p>
           
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                ></input>
              </div>
              <div className="login-box-field">
                <p>Gender</p>
                <select
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                >
                  <option value={"male"}>Male</option>
                  <option value={"female"}>Female</option>
                  <option value={"other"}>Chillam</option>
                </select>
              </div>

              <div className="login-box-error">{error}</div>
            </div>
            <div className="login-side-display"></div>
          </>
        ) : 
         activeStep == 2 ? (
          // third Panel
          <>
            <div className="login-box">
              <div className="login-box-title">Final Step</div>

              <div className="login-box-field">
                <p>Skills</p>
                <input
                  onKeyDown={skillselecthandle}
                  placeholder="Type skills and hit Enter"
                  value={aSkill}
                  onChange={(e)=>setASkill(e.target.value)}
                ></input>
              </div>

              <div className="skills-array">
                {skills.map((skill) => (
                  <Chip label={skill}  onDelete={()=>deleteSkill(skill)}></Chip>
                ))}
              </div>

              <div className="login-box-field">
                <p>Designation</p>
                <input
                  value={designation}
                  onChange={(e) => setdesignation(e.target.value)}
                  placeholder="i.e, SDE,Student,FreeLancer"
                ></input>
              </div>

              <div className="login-box-field">
                <p>Organisation</p>
                <input
                  type="text"
                  value={organisation}
                  onChange={(e) => setorganisation(e.target.value)}
                  placeholder="Student can type College Name"
                ></input>
              </div>
              <div className="login-box-field">
                <p>City</p>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setcity(e.target.value)}
                ></input>
              </div>

              <div className="login-box-error">{error}</div>
            </div>
            <div className="login-side-display"></div>
          </>)
          : (<div className="otp">
                  <div>OTP Verification</div>
                  <p>Enter otp sent to {email}</p>
                  <div className="otp-inbox">
                      <input onChange={handleSubmitOtp} value={otp} type="text"></input>
                  </div>
                  <div className="login-box-error" style={{fontSize:"12px"}}>{error}</div>
                  <Button variant="contained" fullWidth onClick={handleSubmitSignin} disabled={load}>Verify</Button>
          </div>)
        }




      </div>
      <div
        className="signin-button"
        style={{ justifyContent: "center", paddingBottom: "20px" }}
      >
        {activeStep == 2 ? (
          <Button variant="contained" onClick={submitHandler} disabled={load}>
            Submit
          </Button>
        ) : ""}
        {
          activeStep <=1 ? <Button
            variant="outlined"
            onClick={() => setActiveStep(activeStep + 1)}
          >
            Next
          </Button> :""
        }
      </div>
    </div>
  );
};

export default Signin;
