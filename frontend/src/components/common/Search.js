import React from 'react'
import PopUp from './popup'
import { useNavigate } from 'react-router-dom'
import './Search.css';
import './Navbar.css'
import { IconButton, List, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import { InputBase } from '@mui/material';

import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';

const SearchElement = ()=>{
    const users = [{name:"Naveen",username:"venomnvn"},{name:"Aegon",username:"venom"},{name:"Bhoomi",username:"bhmi14"}]

    return <div className='search-tab'>
        <h1>Search a user or post</h1>
        <div className="UserSearch-search" component="form">
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon color="info" />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={"Search for User,Post,Language"}
              inputProps={{ "aria-label": "Search for user" }}
            />
          </div>
          <List>
          {
            users.map((user)=><ListItemButton>
                <ListItemAvatar>
                <Avatar>
                </Avatar>
                </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.username}></ListItemText>
                </ListItemButton>
            )
          }
               
            </List>
    </div>;
};

const Search = () => {
    const navigate = useNavigate();
  return (<PopUp cancel={()=>navigate('/')} element={<SearchElement></SearchElement>} ></PopUp>
  )
}

export default Search