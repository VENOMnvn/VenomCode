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
import { addUser } from "./utils/slices/userSlice";
import UserProfilepage from "./components/profile/user";
import userill from "./static/userill.jpg";
import { Avatar } from "@mui/material";
import LoginWarning from "./components/common/LoginWarning";
import PostPage from "./components/homepage/PostPage";
import CodeRunner from "./components/common/CodeRunner";
import SavedPost from "./components/profile/Savedpost";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

  const PrimaryColor = '#004E64'
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
  const user = useSelector((state) => state.user.user);

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
          <Route path="/register" element={<Signin></Signin>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          {/* <Route path="/chat" element={<PopUp element={<Messenger></Messenger>} cancel={()=>navigate("/")} isFull={true}></PopUp>}></Route> */}
          <Route path="/chat" element={<Messenger></Messenger>}></Route>
          <Route path="/home" element={<Homepage></Homepage>}></Route>
          <Route path="/" index element={<Homepage></Homepage>}></Route>
          <Route path="/sharepost" element={<SharePost></SharePost>}></Route>
          <Route path="/search" element={<Search></Search>}></Route>
          <Route path="/profile" element={<Profilepage></Profilepage>}></Route>
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
