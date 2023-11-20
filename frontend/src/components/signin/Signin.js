import React, { useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import './signin.css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Signin = () => {

    const [activeStep,setActiveStep] = useState(0);
    const [error , setError] = useState("");
    const [disabled,setdisabled] = useState(true);

    const emailref = useRef();
    const passwordref = useRef();
    const confirmref = useRef();
    const usernameref = useRef();

    const firstnameref = useRef();
    const lastnameref = useRef();
    const dobref= useRef();
    const genderref = useRef();

    const Designationref = useRef();
    const Organisationref = useRef();
    const cityref = useRef();
    const Skillsref = useRef();


  
    const validate = ()=>{

    };

   return (<div className='signin'>
   <div className='stepper'>
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
    </Stepper>
   </div>


   <div className='signin-body'>
   {
    activeStep == 0 ? 
    <> 
    {/* First Paenel */}
    <div className='login-box'>
        <div className='login-box-title'>
            Welcome
        </div>
        <div className='login-box-field'>
            <p>Username</p>
            <input ref={emailref} onBlur={validate} placeholder='Choose a unique username'></input>
        </div>
        <div className='login-box-field'>
           <p>Email</p>
            <input ref={emailref} onBlur={validate}></input>
        </div>

        <div className='login-box-field'>
            <p>Password</p>
            <input type='password' ref={passwordref} onBlur={validate}></input>
        </div>
        <div className='login-box-field'>
            <p>Verify</p>
            <input type='password' ref={passwordref} onBlur={validate}></input>
        </div>

        <div className='login-box-error'>{error}</div>
       
      </div>
      <div className='login-side-display'></div>
   </>
: // second panel
activeStep == 1 ? <>
    <div className='login-box'>
        <div className='login-box-title'>
            Tell us more
        </div>
        <div className='login-box-field'>
            <p>First Name</p>
            <input ref={emailref} onBlur={validate} placeholder='Choose a unique username'></input>
        </div>
        <div className='login-box-field'>
           <p>Last name</p>
            <input ref={emailref} onBlur={validate}></input>
        </div>

        <div className='login-box-field'>
            <p>Date of Birth</p>
            <input type='password' ref={passwordref} onBlur={validate}></input>
        </div>
        <div className='login-box-field'>
            <p>Gender</p>
            <input type='password' ref={passwordref} onBlur={validate}></input>
        </div>

        <div className='login-box-error'>{error}</div>
       
      </div>
      <div className='login-side-display'></div>
   </>

: // third Panel
<>
    <div className='login-box'>
        <div className='login-box-title'>
            Final Step
        </div>
        <div className='login-box-field'>
            <p>Skills</p>
            <input ref={emailref} onBlur={validate} placeholder='Choose a unique username'></input>
        </div>
        <div className='login-box-field'>
           <p>Designation</p>
            <input ref={emailref} onBlur={validate}></input>
        </div>

        <div className='login-box-field'>
            <p>Organisation</p>
            <input type='password' ref={passwordref} onBlur={validate}></input>
        </div>
        <div className='login-box-field'>
            <p>City</p>
            <input type='password' ref={passwordref} onBlur={validate}></input>
        </div>

        <div className='login-box-error'>{error}</div>
       
      </div>
      <div className='login-side-display'></div>
   </>
   }
   </div>
   <div className='signin-button'>
      <Button sx={{color:"black"}} disabled={activeStep==0} startIcon={<ArrowBackIosIcon></ArrowBackIosIcon>} onClick={()=>setActiveStep(activeStep-1)}>
        Back
      </Button>
      {activeStep==2 ? <Button variant="contained">Submit</Button>:
      <Button variant='outlined' onClick={()=>setActiveStep(activeStep+1)}>
        Next
      </Button>
      }
   </div>

    </div>
  )
}

export default Signin