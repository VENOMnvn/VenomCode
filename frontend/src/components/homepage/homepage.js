 import './homepage.css';
import HomeFeed from './homefeed';
import CreatePost from './CreatePost';
import Filter from './FilterComp';
import ProfileCard from './ProfileCard';
import DeveloperCard from './DeveloperCard';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Box, Divider, Drawer, Typography } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { setDrawer } from '../../utils/slices/utilitySlice';


const HomePage = ()=>{
   

    return <>

    <div className="Homepage" style={{marginTop:"50px"}}>
    <div className="left-homepage">
    <ProfileCard></ProfileCard>
    {/* <DeveloperCard></DeveloperCard> */}
    </div>
    <div className="center-homepage"><HomeFeed></HomeFeed></div>
    <div className="right-homepage">
    <CreatePost></CreatePost>
    <Filter></Filter>
    </div>
    </div>
    </>;
}

export default HomePage;