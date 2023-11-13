import './App.css';
import Navbar from './components/common/NavBar';
import Register from './components/common/register';
import {Routes,Route, useLocation} from 'react-router-dom';
import Homepage from './components/homepage/homepage';
import { useEffect, useState } from 'react';
import PopUp from './components/common/popup';

function App() {
  const [nav,isNav] = useState(true);
  const location = useLocation();
  useEffect(()=>{

   if(location.pathname == '/register'){
    isNav(false);
   }
   else{
    isNav(true);
   }
  },[location]);

 
  return (
    <div className="App">
    {nav? <Navbar></Navbar>:""}
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path='/' index element={<Homepage></Homepage>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
