import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Navbar.css';



const NavbarSimple = () => {
  
  const navigate = useNavigate();

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
            <span className="" style={{"font-weight":700,"font-size":"1.4rem"}}>Venom's</span>
            <span className="" style={{"font-weight":800,"color":"#1C8765","font-size":"1.4rem"}}>Code</span>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default NavbarSimple;
