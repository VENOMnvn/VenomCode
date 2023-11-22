import './App.css';
import Navbar from './components/common/NavBar';
import Register from './components/common/register';
import {Routes,Route, useLocation, useNavigate} from 'react-router-dom';
import Homepage from './components/homepage/homepage';
import { useEffect, useState } from 'react';
import PopUp from './components/common/popup';
import Messenger from './components/chat/Messengers';
import Profilepage from './components/profile/profilepage';
import Signin from './components/signin/Signin';
import Login from './components/signin/Login';
import axios from 'axios';
import NavbarSimple from './components/common/NavBar-simple';

function App() {

  const [nav,isNav] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{

   if(location.pathname == '/register' || location.pathname == '/login'){
    isNav(false);
   }
   else{
    isNav(true);
   }
  },[location]);

  
 
  return (
    <div className="App">
    {nav? <Navbar></Navbar>:<NavbarSimple></NavbarSimple>}
      <Routes>
        <Route path="/register" element={<Signin></Signin>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/chat" element={<PopUp element={<Messenger></Messenger>} cancel={()=>navigate("/")} isFull={true}></PopUp>}></Route>
        <Route path='/home'  element={<Homepage></Homepage>}></Route>
        <Route path='/' index  element={<Homepage></Homepage>}></Route>
        <Route path='/profile'  element={<Profilepage></Profilepage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
