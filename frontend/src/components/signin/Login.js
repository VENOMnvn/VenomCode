import React, { useEffect, useRef, useState } from 'react'
import './signin.css';
import {Button, TextField} from "@mui/material";
import { Link } from 'react-router-dom';

const Login = () => {
  const emailref = useRef();
  const passwordref = useRef();
  const [disabled,setdisabled] = useState(true);
  const [error,setError] = useState("");

  const validate = ()=>{
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

    if(!emailref.current.value){
        setError("Email is Empty");
        return false;
    }
    if(!passwordref.current.value){
      setError("Password Cannot be Empty");
      return false;
    }
    if(!emailRegex.test(emailref.current.value)){
      setError("Enter a Valid Email");
      return false;
    }
    if(!passwordRegex.test(passwordref.current.value)){
      setError("Password format didnt Match. i.e., A Capital Letter,a small letter, number and symbol");
      return false;
    }
    setError("");
    setdisabled(false);
    return true;
  }
    
  return (
    <div className='login'>
      <div className='login-box'>
        <div className='login-box-title'>
            Login to Continue
        </div>
        <div className='login-box-field'>
           <p>Email</p>
            <input ref={emailref} onBlur={validate}></input>
        </div>
        <div className='login-box-field'>
            <p>Password</p>
            <input type='password' ref={passwordref} onBlur={validate}></input>
        </div>
        <div className='login-box-error'>{error}</div>
        <Button fullwidth variant='contained' disabled={disabled} onClick={validate}>Login</Button>
        <div>Dont have an account ? <Link to={'/register'}>Register Yourself</Link> instead</div>
      </div>
      <div className='login-side-display'></div>
    </div>
  )
}

export default Login