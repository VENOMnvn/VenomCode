import { useEffect, useState } from "react";
import "./../common/Modal.css";
import './signin.css';
import { Password} from "phosphor-react";
import { Button ,IconButton} from "@mui/material";
import axios from "axios";
import path from "../../path";

const ForgetPassword = ({cancel}) => {
  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [error, setError] = useState("");
  const [disabled,setDisabled] = useState(false);
  const [email,setEmail] = useState("");
  const [sendToken ,setSendToken] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  const validate = () => {
    console.log(password,password.length,password.length>0);
    if (!emailRegex.test(email) && email.length > 0) {
      setError("Enter a Valid Email");
      return false;
    }
    if (!passwordRegex.test(password) && !password.length > 0) {
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


  useEffect(()=>{
    console.log("ON ERROR STATE CHANGE value of Validate is = ",validate());
    if(validate()==true){
        setDisabled(false);
    }else{
        setDisabled(true);
    }
  },[error]);

  useEffect(()=>{
    console.log("Disabled = ",disabled);
  },[disabled]);
  const submitPassword = async ()=>{
    
    try{

          
           const response = await axios.post(path+'resetpassword',{
            email,password
           });
           console.log(response);
           if(response.data.success){
              setSendToken(true);
           }
    }catch(err){
        console.log(err);
    }
  }



  return (
    <>
      {" "}
      <div className="modalContainer">
        <div className="modalBox">
          <div className="modal-top">
        <IconButton style={{
        backgroundColor:"#e4e6eb"
        }} >{<Password size={24}></Password>}</IconButton>
        <IconButton
        onClick={cancel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            fill="currentColor"
            viewBox="0 0 256 256"
            class="h-6 w-6"
          >
            <rect width="256" height="256" fill="none"></rect>
            <line
              x1="200"
              y1="56"
              x2="56"
              y2="200"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="12"
            ></line>
            <line
              x1="200"
              y1="200"
              x2="56"
              y2="56"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="12"
            ></line>
          </svg>
        </IconButton>
      </div>
          {
            sendToken ? <>
            <div className="modal-body"> 
            <p>Verification Email Send</p>
            <span>
              A email with Verification link is send to your email {email} click on the link to verify and change password
            </span>
            </div>
            <div className="modal-button">
              <Button variant="contained" onClick={cancel}>
                Okay 
              </Button>
            </div>
            </>
            :<>
          <div className="modal-body">
            <p>Reset Your Password</p>
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
            <div className="modal-button">

              <Button variant="contained" onClick={submitPassword} disabled={disabled}>
                Confirm 
              </Button>

            </div>
          </div>
          </>}

        </div>
      </div>
    </>
  );
};
export default ForgetPassword;
