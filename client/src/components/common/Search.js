import React, { useEffect, useState } from "react";
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
import {UsersThree} from 'phosphor-react';
import { useSelector } from "react-redux";

const UserCardSkeleton = ()=>{
 return <>
 <div className="search-user">
          <div className="search-avatar">
              <Skeleton width={40} height={40} variant="circular" animation={"wave"}></Skeleton>
          </div>
          <div className="search-text">
            <div className="search-details-skelton" style={{display:"flex",flexDirection:"column"}}>
              <p>
                <Skeleton width={120} height={30} animation={"wave"}></Skeleton>
              </p>
             <span>
              <Skeleton width={40} height={
              10
              }></Skeleton>
             </span>
            </div>
          </div>
        </div>
 </>
};

const SearchElement = () => {
  const [load,setLoad] = useState(false);
  const [query,setQuery] = useState("");
  const [users,setusers] = useState([]);
  const navigate = useNavigate();
  const userDB = useSelector(s=>s.user.userDB);

  const handleSearch = async (event)=>{
    setLoad(true);

    try{
      const response = await axios.get(`${path}getUser?query=${query}`);
      console.log(response);
      setusers(response.data.users);
    }catch(err){

    }
    setLoad(false);

  }

  const randomSearch = async ()=>{
    setLoad(true)
    try{
      const response = await axios.get(`${path}getUser?limit=10&skip=0`);
      console.log(response);
      setusers(response.data.users);
    }catch(err){
    }
    setLoad(false);
  }

  useEffect(()=>{
    randomSearch();
  },[]);

  return (
    <div className="search-tab">
      <h1><IconButton>
          <UsersThree></UsersThree>
        </IconButton>  Search a User</h1>
      <div className="UserSearch-search" component="form">
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon/>
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 ,backgroundColor:'aliceblue'}}
          placeholder={"Enter Username OR Full name"}
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



      {users?.map((user) => (
        <div className="search-user" onClick={()=>{navigate(`/user/${user.username}`)}}>
          <div className="search-avatar">
            <Avatar src={user.profilePicture}></Avatar>
          </div>
          <div className="search-text">
            <div className="search-details">
              <p>
               {user.firstname + " "+user.lastname}
              </p>
              <span>
              {" "}{user.username}{" "}
              - {" "}{user.designation}{" "}
              - {""}{user.city}
              </span>
            </div>
            {/* <div className="search-button-group">
            <button><AddIcon></AddIcon>Follow</button>
            </div> */}
          </div>
        </div>
      ))}

      {
        load && <>
        <UserCardSkeleton></UserCardSkeleton>
        <UserCardSkeleton></UserCardSkeleton>
        <UserCardSkeleton></UserCardSkeleton>
        <UserCardSkeleton></UserCardSkeleton>
        <UserCardSkeleton></UserCardSkeleton>
        <UserCardSkeleton></UserCardSkeleton>
        <UserCardSkeleton></UserCardSkeleton>
        <UserCardSkeleton></UserCardSkeleton>
        <UserCardSkeleton></UserCardSkeleton>
        </>
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
