import { Avatar } from '@mui/material'
import React from 'react'
import profilePic from './../../static/profile.jpeg'
import BookmarkIcon from '@mui/icons-material/Bookmark';

const DeveloperCard = () => {
  return ( <div className='profile-card'>
        <div className='profile-card-top'>
        <div>
            <Avatar src={profilePic}>NC</Avatar>
        </div>
        </div>
        <div className='profile-card-details'>
            <p>Naveen Chaudhary</p>
            <span>Mern Stack Developer | Ex-intern @BlaccSckull Pvt ltd</span>
        </div>
        <div className='developerAbout'>
            Developer
        </div>
    </div>
  )
};

export default DeveloperCard;