import React, { useEffect, useRef, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { Button, Avatar, Icon } from "@mui/material";
import { Sidebar } from "keep-react";
import {
  Chat,
  SignIn,
  Note,
  UserPlus,
  User,
  UsersThree,
  Sliders,
  SignOut,
  Bell,
  Book,
  YoutubeLogo,
} from "phosphor-react";
import { youtubeLogoLink } from "../../path";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import Modal from "./Modal";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Navbar.css";
import Tooltip from "@mui/material/Tooltip";
import Badge from "@mui/material/Badge";
import logo from "./../../static/logo.png";
import { Drawer, Divider } from "@mui/material";
import path, { version } from "../../path";
import axios from "axios";
import Filter from "../homepage/FilterComp";
import { addUser } from "../../utils/slices/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [notificationBadge, setNotificationBadge] = useState(0);
  const [showFilterModal, setshowFilterModal] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [load, setload] = useState(false);
  const locationState = useLocation();
  const dispatch = useDispatch();

  const location = useRef();

  const checknotification = async () => {
    try {
      const response = await axios.get(
        path + "checknotification?userId=" + user.user._id
      );
      if (response.data.success) {
        setNotificationBadge(response.data.notifications);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    location.current = window.location;
  }, []);

  useEffect(() => {
    checknotification();
  }, [locationState]);

  

  return (
    <>
      {window.outerWidth < 750 ? (
        <div className="drawerOpener">
          <Drawer anchor="left" open={isDrawerOpen}>
            <div
              onClick={() => setDrawerOpen(!isDrawerOpen)}
              className="drawerClose"
            >
              <IconButton>
                <ArrowBackIosRoundedIcon></ArrowBackIosRoundedIcon>
              </IconButton>
            </div>
            <div className="drawer">
              <Sidebar aria-label="Sidebar with multi-level dropdown example">
                <Sidebar.Items className="sidebar-Items">
                  <span
                    className=""
                    style={{
                      "font-weight": 700,
                      "font-size": "1.4rem",
                      marginLeft: "4px",
                    }}
                  >
                    Venom's
                  </span>
                  <span
                    className=""
                    style={{
                      "font-weight": 800,
                      color: "#1C8765",
                      "font-size": "1.4rem",
                    }}
                  >
                    Code
                  </span>

                  <Sidebar.ItemGroup
                    onClick={() => setDrawerOpen(!isDrawerOpen)}
                  >
                    <Link to={youtubeLogoLink}>
                      <Sidebar.Item icon={<YoutubeLogo size={24} />}>
                        Tutorial
                      </Sidebar.Item>
                    </Link>

                    <Link to={"/sharepost"}>
                      <Sidebar.Item icon={<Note size={24} />}>
                        Share Post
                      </Sidebar.Item>
                    </Link>

                    {/* <Sidebar.Collapse
                      icon={<ShoppingCart size={24} />}
                      label="Filter"
                    >
                      <Sidebar.Item href="#" icon={<Handbag size={24} />}>
                        Products
                      </Sidebar.Item>
                    </Sidebar.Collapse> */}

                    <Link to="/chat">
                      <Sidebar.Item icon={<Chat size={24} />}>
                        Inbox
                      </Sidebar.Item>
                    </Link>

                    <Link to="/problems">
                      <Sidebar.Item icon={<Book size={24} />}>
                        Problems
                      </Sidebar.Item>
                    </Link>
                    <Link to="/notifications">
                      <Sidebar.Item
                        icon={
                          <Badge badgeContent={notificationBadge}>
                            <Bell size={24} />
                          </Badge>
                        }
                      >
                        Notifications
                      </Sidebar.Item>
                    </Link>

                    <Link>
                      <Sidebar.Item
                        icon={<Sliders size={24} />}
                        onClick={() => setshowFilterModal(true)}
                      >
                        Filters
                      </Sidebar.Item>
                    </Link>

                    <Link to={"/search"}>
                      <Sidebar.Item icon={<SearchIcon />}>Search</Sidebar.Item>
                    </Link>

                    <Link to="/people">
                      <Sidebar.Item icon={<UsersThree size={24} />}>
                        People
                      </Sidebar.Item>
                    </Link>

                    {user.user ? (
                      <Sidebar.Item
                        onClick={() => {
                          setShowModal(!showModal);
                          setDrawerOpen(!isDrawerOpen);
                        }}
                        icon={<SignOut size={24} />}
                      >
                        Logout
                      </Sidebar.Item>
                    ) : (
                      <Link to="/register">
                        <Sidebar.Item
                          onClick={() => setDrawerOpen(!isDrawerOpen)}
                          icon={<UserPlus size={24} />}
                        >
                          Login
                        </Sidebar.Item>
                      </Link>
                    )}
                  </Sidebar.ItemGroup>
                </Sidebar.Items>
              </Sidebar>
            </div>
          </Drawer>
        </div>
      ) : (
        ""
      )}

      <nav className="navbar-container">
        <div className="navbar-toolbar">
          <ul
            className="icon-class"
            style={{ minWidth: "9.4rem" }}
            onClick={() => navigate("/")}
          >
            <li>{<img src={logo} alt="VenomCode" width={"33px"} />}</li>
            <li>
              <span
                className=""
                style={{
                  "font-weight": 700,
                  "font-size": "1.4rem",
                  marginLeft: "4px",
                }}
              >
                Venom's
              </span>
              <span
                className=""
                style={{
                  "font-weight": 800,
                  color: "#1C8765",
                  "font-size": "1.4rem",
                }}
              >
                Code
              </span>
            </li>
            <li>
              <span
                style={{
                  margin: "4px",
                  color: "gray",
                }}
              >
                {version}
              </span>
            </li>
          </ul>

          <ul className="nav-button">
            <li className="cursor-pointer" onClick={() => navigate("/home")}>
              Home
            </li>
            <Link to="/problems">
              <li className="cursor-pointer" style={{ minWidth: "4rem" }}>
                Problems
              </li>
            </Link>
            <Link to="/people">
              <li className="cursor-pointer" style={{ minWidth: "4rem" }}>
              People
              </li>
            </Link>
            
          </ul>

          <div style={{ flex: 1 }}></div>
          {/*           
          <div className="userSearch" component="form">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon color="info" />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={"Search for User,Post,Language"}
              inputProps={{ "aria-label": "Search for user" }}
            />
          </div> */}

          <div style={{ flex: 1 }}></div>

          <ul className="nav-icons">
            <li>
              <a href={youtubeLogoLink}>
              <Tooltip title="Tutorial">
                <IconButton
                  aria-label="delete"
                  >
                  <YoutubeLogo
                    size={24}
                    sx={{ color: "black", fontSize: "28px" }}
                    />
                </IconButton>
              </Tooltip>
                    </a>
            </li>

            <li>
              <Tooltip title="Search">
                <IconButton
                  aria-label="delete"
                  onClick={() => navigate("/search")}
                >
                  <SearchIcon sx={{ color: "black", fontSize: "28px" }} />
                </IconButton>
              </Tooltip>
            </li>

            {user.user && (
              <li
                onClick={() => {
                  setShowModal(!showModal);
                }}
              >
                <Tooltip title="Logout">
                  <IconButton aria-label="delete" className="chat-icon">
                    <LogoutRoundedIcon
                      sx={{ color: "black", fontSize: "25px" }}
                    />
                  </IconButton>
                </Tooltip>
              </li>
            )}

            <li>
              <Link to={"/chat"}>
                <Tooltip title="Message">
                  <IconButton
                    aria-label="delete"
                    className="chat-icon"
                    onClick={() => {
                      if(!user.user) {
                        setLoginError(true);
                        }
                    }}
                  >
                    <ChatBubbleOutlineRoundedIcon
                      sx={{ color: "black", fontSize: "25px" }}
                    />
                  </IconButton>
                </Tooltip>
              </Link>
            </li>

            <li>
              <Link to={"/notifications"}>
                <Tooltip title="notification">
                  <IconButton
                    aria-label="delete"
                    className="chat-icon"
                    onClick={() => {
                      if (!user.user) {
                        setLoginError(true);
                        navigate("/");
                      }
                    }}
                  >
                    <Badge badgeContent={notificationBadge} color="primary">
                      <NotificationsNoneRoundedIcon
                        sx={{ color: "black", fontSize: "25px" }}
                      />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Link>
            </li>
          </ul>

          {user.user === false ? (
            <Button variant="outlined">
              <Link to="/Login">{"Signin"}</Link>
            </Button>
          ) : (
            <div className="flex gap-x-4">
              <Avatar
                sx={{ height: "30px", width: "30px" }}
                onClick={() => navigate("/profile")}
                src={user.userDB?.profilePicture || user.user?.profilePicture}
                className="cursor-pointer"
              ></Avatar>
            </div>
          )}
          <div
            className="drawer-opener"
            onClick={() => setDrawerOpen(!isDrawerOpen)}
          >
            <ArrowForwardIosRoundedIcon
              sx={{ width: "14px", marginLeft: "4px" }}
            ></ArrowForwardIosRoundedIcon>
          </div>
        </div>
      </nav>

      {showModal && (
        <Modal
          Icon={LogoutRoundedIcon}
          heading={"Do you want to Logout ?"}
          subheading={"Keep the Credentials safe"}
          leftButton={true}
          cancel={() => setShowModal(false)}
          confirm={() => {
            localStorage.clear();
            window.location.reload();
           
          }}
        ></Modal>
      )}

      {showFilterModal && (
        <Modal
          Element={Filter}
          cancel={() => setshowFilterModal(false)}
          Icon={Sliders}
          heading={"Filter"}
        ></Modal>
      )}

    </>
  );
};

export default Navbar;
