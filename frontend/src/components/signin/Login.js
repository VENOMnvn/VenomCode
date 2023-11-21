import React, { useEffect, useRef, useState } from 'react'
import './signin.css';
import {Button, TextField} from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import path from './../../path.js';
import axios from 'axios'
import {useDispatch} from 'react-redux';
import {addUser} from './../../utils/slices/userSlice.js'
import LinearProgress from '@mui/material/LinearProgress';

const Login = () => {
  const emailref = useRef();
  const passwordref = useRef();
  const [disabled,setdisabled] = useState(true);
  const [error,setError] = useState("");
  const [load,setload] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  const submitHandler = async ()=>{
      setload(true);
      if(validate){
        const response = await axios.post(`${path}login`,{
          password:passwordref.current.value,
          email:emailref.current.value
        });
        console.log(response);
        if(response.data.success){
            setError("");
            dispatch(addUser(response.data.user));
            setload(false);
            navigate('/');
        }else{
            setError(response.data.msg);
        }
      }
      setload(false);
  };
    
  return (
    <>
    <div className='login'>
      <div className='login-box'>
    {load && <LinearProgress></LinearProgress>}
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
        <Button fullwidth variant='contained' disabled={disabled} onClick={submitHandler}>Login</Button>
        <div>Dont have an account ? <Link to={'/register'}>Register Yourself</Link> instead</div>
      </div>
      <div className='login-side-display'></div>
    </div>
    </>
  )
}

export default Login