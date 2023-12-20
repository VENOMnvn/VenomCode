import "./App.css";
import Navbar from "./components/common/NavBar";
import Register from "./components/common/register";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import Homepage from "./components/homepage/homepage";
import { useEffect, useState } from "react";
import PopUp from "./components/common/popup";
import Messenger from "./components/chat/Messengers";
import Profilepage from "./components/profile/profilepage";
import Signin from "./components/signin/Signin";
import Login from "./components/signin/Login";
import axios from "axios";
import SharePost from "./components/common/SharePost";
import NavbarSimple from "./components/common/NavBar-simple";
import Search from "./components/common/Search";
import { useDispatch, useSelector } from "react-redux";
import path from "./path";
import { addUserDB } from "./utils/slices/userSlice";
import UserProfilepage from "./components/profile/user";
import userill from "./static/userill.jpg";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Avatar } from "@mui/material";
import LoginWarning from "./components/common/LoginWarning";
import PostPage from "./components/homepage/PostPage";
import CodeRunner from "./components/common/CodeRunner";
import SavedPost from "./components/profile/Savedpost";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeMaxOutlinedIcon from "@mui/icons-material/HomeMaxOutlined";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Filter from "./components/homepage/FilterComp";
import Modal from "./components/common/Modal";
import NotificationPanel from "./components/common/NotificationPanel";
import PeopleJS from "./components/People.js/People";
import ProblemPage from "./components/problemPage/ProblemPage";

const NotFound = ({ msg }) => {
  return (
    <>
      <div className="fullscreen centerAll">
        <Avatar src={userill} sx={{ width: "200px", height: "200px" }}></Avatar>
        <p>{msg ? msg : "Page Not Found"}</p>
        <Link to={"/"}>
          <button>Go to Home</button>
        </Link>
      </div>
    </>
  );
};

function App() {
  const PrimaryColor = "#004E64";
  // const PrimaryColor = "#8a2be2";
  const theme = createTheme({
    palette: {
      primary: {
        main: PrimaryColor,
      },
    },
  });
  
  const [nav, isNav] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token  = useSelector(state=>state.utility.token);
  const user = useSelector((state) => state.user.user);
  
  axios.defaults.headers.common['authorization'] = `Bearer ${token}`;

  const getUserDetails = async () => {
    if (user) {
      try {
        const res = await axios.post(`${path}getuserdetails`, {
          userid: user?._id,
        });
        
        if (res.data.success) {
          dispatch(addUserDB(res.data.user));
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
 
  useEffect(()=>{
    getUserDetails();
  },[]);


  useEffect(() => {
    if (location.pathname == "/register" || location.pathname == "/login") {
      isNav(false);
    } else {
      isNav(true);
    }
  }, [location]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="App">
          {nav ? <Navbar></Navbar> : <NavbarSimple></NavbarSimple>}
          <Routes>
            <Route
              path="/register"
              element={
                <GoogleOAuthProvider clientId="713976535576-c7c6grdnm12gjr9imqm388bp8utginil.apps.googleusercontent.com">
                  <Signin></Signin>
                </GoogleOAuthProvider>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <GoogleOAuthProvider clientId="713976535576-c7c6grdnm12gjr9imqm388bp8utginil.apps.googleusercontent.com">
                  <Login></Login>
                </GoogleOAuthProvider>
              }
            ></Route>
            {/* <Route path="/chat" element={<PopUp element={<Messenger></Messenger>} cancel={()=>navigate("/")} isFull={true}></PopUp>}></Route> */}
            <Route path="/chat" element={<Messenger></Messenger>}></Route>
            <Route path="/problems" element={<ProblemPage></ProblemPage>}></Route>
            <Route path="/home" element={<Homepage></Homepage>}></Route>
            <Route path="/" index element={<Homepage></Homepage>}></Route>
            <Route path="/sharepost" element={<SharePost></SharePost>}></Route>
            <Route path="/search" element={<Search></Search>}></Route>
            <Route path="/filter" element={<Filter></Filter>}></Route>
            <Route path="/people" element={<PeopleJS></PeopleJS>}></Route>
            <Route
              path="/profile"
              element={<Profilepage></Profilepage>}
            ></Route>
            <Route
              path="/user/:id"
              element={<UserProfilepage></UserProfilepage>}
            ></Route>
            <Route
              path="/pleaselogin"
              element={<LoginWarning></LoginWarning>}
            ></Route>
            <Route path="/post/:id" element={<PostPage></PostPage>}></Route>
            <Route path="/saved" element={<SavedPost></SavedPost>}></Route>
            <Route
              path="/notifications"
              element={
                <PopUp
                  element={<NotificationPanel />}
                  cancel={() => navigate("/")}
                  isFull
                  
                  IconCancel={ArrowForwardIosRoundedIcon}
                ></PopUp>
              }
            ></Route>
            <Route path="/execute" element={<CodeRunner></CodeRunner>}></Route>
            <Route path="/:error" element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
export { NotFound };
