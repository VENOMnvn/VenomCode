import { Avatar } from '@mui/material'
import React from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';

const ProfileCard = () => {
  return (
    <div className='profile-card'>
        <div className='profile-card-top'>
        <div>
            <Avatar>NC</Avatar>
        </div>
        </div>
        <div className='profile-card-details'>
            <p>Naveen Chaudhary</p>
            <span>Mern Stack Developer | Ex-intern @BlaccSckull Pvt ltd</span>
        </div>
        <div className='profile-card-followers'>
            <p>People who follows you <span>69</span></p>
            <p>People who followed by you <span>69</span></p>
        </div>
        <div className='profile-card-bottom'>
            <BookmarkIcon sx={{color:"gray"}}></BookmarkIcon>{"  "}
            My items
        </div>
    </div>
  )
}

export default ProfileCard