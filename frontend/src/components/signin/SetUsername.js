import { useEffect, useState } from "react";
import "./../common/Modal.css";
import "./signin.css";
import { Password, Warning, UserCircle } from "phosphor-react";
import { Button, IconButton } from "@mui/material";
import axios from "axios";
import path from "../../path";

const SetUsername = ({ cancel,data }) => {
    
  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState("");
  const [sendToken, setSendToken] = useState(false);
  const [username, setusername] = useState();
  

  const validate = async () => {
    try{
        const response = await axios.get(`${path}getUserName?user=${username}`);
        console.log(response);

        if(!response.data.isUserUnique){
            setError("Username is not available Try another !");
            setDisabled(true);
            return false;
        }else{
            setError("");
            setDisabled(false);
            return true
        }
    }
    catch(err){
        return false;
    }
  };

 

  useEffect(() => {}, [disabled]);
  const submitPassword = async () => {
    try {
      const response = await axios.post(path + "resetpassword", {
        email,
        password,
      });
      console.log(response);
      if (response.data.success) {
        setSendToken(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      <div className="modalContainer">
        <div className="modalBox">
          <div className="modal-top">
            <IconButton
              style={{
                backgroundColor: "#e4e6eb",
              }}
            >
              {<Password size={24}></Password>}
            </IconButton>
            <IconButton onClick={cancel}>
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
          <div className="modal-body">
            <p>Welcome to VenomCode</p>
            <span>Set a unique username , You cant change it again </span>
            </div>

            <div className="login-box-field">
              <IconButton>
                <UserCircle size={32}></UserCircle>
              </IconButton>
              <input
                value={username}
                onChange={(e) => setusername(e.target.value.toLowerCase())}
                onBlur={validate}
                onKeyDown={validate}
                placeholder="New Username"
              ></input>
            </div>
            <div className="login-box-error">{error}</div>
            <div className="modal-button">
              <Button
                variant="contained"
                onClick={submitPassword}
                disabled={disabled}
              >
                Confirm
              </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default SetUsername;
