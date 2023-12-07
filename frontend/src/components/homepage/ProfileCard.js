import { Avatar, Button } from '@mui/material'
import React from 'react'
import profilePic from './../../static/profile.jpeg'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useSelector } from 'react-redux';
import userill from './../../static/userill.jpg';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
    const user = useSelector(s=>s.user.user);
    const userDB = useSelector(s=>s.user.userDB);
    const navigate = useNavigate();
    
  return (
    <div className='profile-card'>
       {user?<>
        <div className='profile-card-top'>
        <div>
            <Avatar src={userDB?.profilePicture}>NC</Avatar>
        </div>
        </div>
        <div className='profile-card-details'>
            <p>{userDB?.firstname + " " + userDB?.lastname}</p>
            <div>{userDB?.bio}</div>
        </div>
        <div className='profile-card-followers'>
            <p>People who follows you <span>{userDB?.followers?.length}</span></p>
            <p>People who followed by you <span>{userDB?.following?.length}</span></p>
        </div>
        <div className='profile-card-bottom'  style={{cursor:"pointer"}}>
           <Button fullWidth variant='contained' onClick={()=>navigate('/profile?edit=1')} >Edit Profile</Button>
           <Button fullWidth variant='outlined' startIcon={<BookmarkIcon></BookmarkIcon>} sx={{marginTop:2}} onClick={()=>navigate('/profile?saved=1')} >My Saved</Button>
        </div>
       </>:<>
        <div className='profile-card-top'>
        <div>
            <Avatar src={userill}></Avatar>
        </div>
        </div>
        <div className='profile-card-details'>
            <p style={{fontSize:"24px"}}>About us </p>
        </div>
        <div className='profile-card-followers'>
            <p>This is a Website to help you in your programming journey</p>
            <p>Share your Solutions</p>
            <p>Learn from other's Solutions</p>
        </div>
        <div className='profile-card-bottom'>
           <Button fullWidth variant='contained' onClick={()=>navigate('/login')}>Login</Button>
           <Button fullWidth variant='outlined' startIcon={""} sx={{marginTop:2}} onClick={()=>navigate('/register')}>Register</Button>
        </div>
       
       </>}
    </div>
  )
}

export default ProfileCard