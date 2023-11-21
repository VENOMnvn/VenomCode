import React, { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import { Button, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './Navbar.css';
import Tooltip from '@mui/material/Tooltip';
import PopUp from "./popup";
import Messenger from "../chat/Messengers";
import Badge from '@mui/material/Badge';


const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector(state=>state.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [showChat,setChat] = useState(false);

  const cancel = ()=>{
    setChat(false);
  }


  return (
    <nav className="navbar-container">
      <div className="navbar-toolbar">
       
      
      <ul
          onClick={() => navigate("/")}
          className="icon-class"
          style={{ minWidth: "9.4rem" }}
        >
          <li>
          {
            // <img src={siteicon} alt="LegalServices" width={"33px"} />
          }
          </li>
          <li>
            <span className="" style={{"font-weight":700,"font-size":"1.4rem"}}>Venom</span>
            <span className="" style={{"font-weight":800,"color":"#1C8765","font-size":"1.4rem"}}>Code</span>
          </li>
        </ul>

        {
        //     <div className="flex items-center" style={{ minWidth: "6.5rem" }}>
        //   <Button
        //     style={{ textTransform: "none" }}
        //     id="resources-button"
        //     onClick={handleClick}
        //     aria-controls={open ? "resorces-menu" : undefined}
        //     aria-haspopup="true"
        //     aria-expanded={open ? "true" : undefined}
        //     endIcon={<KeyboardArrowDownIcon />}
        //     className="text-black"
        //   >
        //     {langKey}
        //   </Button>

        //   <Menu
        //     id="resources-menu"
        //     anchorEl={anchorEl}
        //     open={open}
        //     MenuListProps={{
        //       "aria-labelledby": "resources-button",
        //     }}
        //     onClose={handleClose}
        //     anchorOrigin={{
        //       vertical: "bottom",
        //       horizontal: "right",
        //     }}
        //     transformOrigin={{
        //       vertical: "top",
        //       horizontal: "right",
        //     }}
        //   >
        //     <MenuItem onClick={() => handleLanguageChange("english")}>
        //       English
        //     </MenuItem>
        //     <MenuItem onClick={() => handleLanguageChange("hindi")}>
        //       Hindi
        //     </MenuItem>
        //     <MenuItem onClick={() => handleLanguageChange("bengali")}>
        //       Bengali
        //     </MenuItem>
        //     <MenuItem onClick={() => handleLanguageChange("telugu")}>
        //       Telegu
        //     </MenuItem>
        //     <MenuItem onClick={() => handleLanguageChange("tamil")}>
        //       Tamil
        //     </MenuItem>
        //   </Menu>
        // </div>

        }

        <ul className="nav-button">
          <li className="cursor-pointer" onClick={()=>navigate('/home')}>{"Home"}</li>
          <li className="cursor-pointer" style={{ minWidth: "4rem" }}>
              Problem
          </li>
        </ul>

        {showChat?<PopUp element={<Messenger></Messenger>} cancel={cancel} isFull={true}></PopUp>:""}
        <div style={{ flex: 1 }}></div>
        <div
          component="form"
          style={{
            border: "1.5px solid #cfd1d5",
            borderRadius: "0.6rem",
            padding: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >

          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon color="info" />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder={"Search for User,Post,Language"}
            inputProps={{ "aria-label": "Search for user" }}
          />
        </div>
        <div style={{ flex: 1 }}></div>


        <ul className="nav-icons">
          <li>
            <IconButton aria-label="delete" >
              <NotificationsNoneRoundedIcon sx={{ color: "#1C8765",fontSize:"28px" }} />
            </IconButton>
          </li>

          <li onClick={()=>setChat(true)}>
            <Tooltip title="Message">
            <IconButton aria-label="delete" className="chat-icon">
            <Badge badgeContaent={4} color="primary">
              <ChatBubbleOutlineRoundedIcon sx={{ color: "#1C8765" ,fontSize:"25px"}} />
             </Badge>
            </IconButton>
            </Tooltip>
          </li>
          <li></li>
        </ul>

        

         {user.user === false ? (
          <Button>
            <Link to="/Login">{"Signin"}</Link>
          </Button>
        ) : (
          <div className="flex gap-x-4">
          {console.log(user)}
            <Avatar sx={{height:"30px","width":"30px"}} onClick={() => navigate("/profile")} className="cursor-pointer">{user?.user?.firstname[0]?.toUpperCase()}</Avatar>
          </div>
        )} 

      </div>
    </nav>
  );
};

export default Navbar;
