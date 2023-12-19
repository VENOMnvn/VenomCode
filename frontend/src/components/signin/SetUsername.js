import { useEffect, useState } from "react";
import "./../common/Modal.css";
import "./signin.css";
import { Password, Warning, UserCircle } from "phosphor-react";
import { Button, IconButton, LinearProgress } from "@mui/material";
import axios from "axios";
import path from "../../path";
import { addUser, addUserDB } from "../../utils/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/slices/utilitySlice";

const SetUsername = ({ cancel, data }) => {
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [load,setLoad] = useState(false);
  const [username, setusername] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = async () => {
    try {
      const response = await axios.get(`${path}getUserName?user=${username}`);
      console.log(response);

      if (!response.data.isUserUnique) {
        setError("Username is not available Try another !");
        setDisabled(true);
        return false;
      } else {
        setError("");
        setDisabled(false);
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {}, [disabled]);

  const submitUsername = async () => {
    setLoad(true);
    setDisabled(true);
    try {

      const response = await axios.post(path + "usergoogle", {
        user: data,
        username: username,
      });
      console.log(response.data);
      if (response.data.success) {
        dispatch(addUser(response.data.user));
        dispatch(setToken(response.data.token));
        dispatch(addUserDB(response.data.user));
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
    setLoad(false);
    setDisabled(false);
  };

  return (
    <>
      {" "}
      <div className="modalContainer">
        <div className="modalBox">
          {
            load && <LinearProgress></LinearProgress>
          }
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
              onClick={submitUsername}
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
