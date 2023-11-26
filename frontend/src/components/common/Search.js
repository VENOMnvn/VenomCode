import React, { useState } from "react";
import PopUp from "./popup";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import "./Navbar.css";
import {
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PlaceIcon from '@mui/icons-material/Place';
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import axios from "axios";
import path from "../../path";

const SearchElement = () => {
  const [load,setLoad] = useState(false);
  const [query,setQuery] = useState("");

   const [users,setusers] = useState([
    { name: "Naveen", username: "venomnvn" },
    { name: "Aegon", username: "venom" },
    { name: "Bhoomi", username: "bhmi14" },
  ]);

  const handleSearch = async (event)=>{
  
    try{
      const response = await axios.get(`${path}getUser?query=${query}`);
      console.log(response);

    }catch(err){

    }
  }

  return (
    <div className="search-tab">
      <h1>Search a user or post</h1>
      <div className="UserSearch-search" component="form">
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon color="info" />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={"Search for User"}
          inputProps={{ "aria-label": "Search for user" }}
          onChange={(e)=>setQuery(e.target.value)}
          onKeyDown={e=>{
            if(e.key == "Enter"){
              handleSearch();
            }
          }}
          value={query}
        />
      </div>



      {users.map((user) => (
        <div className="search-user">
          <div className="search-avatar">
            <Avatar></Avatar>
          </div>
          <div className="search-text">
            <div className="search-details">
              <p>
               Naveen Chaudhary
              </p>
              <span>
              {" "}venomnvn{" "}
              - {" "}SDE{" "}
              - {""}Agra
              </span>
            </div>
            <div className="search-button-group">
            <button><AddIcon></AddIcon>Follow</button>
            </div>
          </div>
        </div>
      ))}
      {
        load && <div className="search-user">
          <div className="search-avatar">
              <Skeleton width={40} height={40} variant="circular" animation={"wave"}></Skeleton>
          </div>
          <div className="search-text">
            <div className="search-details-skelton">
              <p>
                <Skeleton width={120} height={60} animation={"wave"}></Skeleton>
              </p>
             
            </div>
            <div className="search-button-group">
            <Skeleton width={100} height={60} animation={"wave"}></Skeleton>
            </div>
          </div>
        </div>
      }

    </div>
  );
};

const Search = () => {
  const navigate = useNavigate();
  return (
    <PopUp
      cancel={() => navigate("/")}
      element={<SearchElement></SearchElement>}
    ></PopUp>
  );
};

export default Search;
