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
            <p>{user?.firstname + " " + user?.lastname}</p>
            <div>{user?.bio}</div>
        </div>
        <div className='profile-card-followers'>
            <p>People who follows you <span>{userDB?.followers?.length}</span></p>
            <p>People who followed by you <span>{userDB?.following?.length}</span></p>
        </div>
        <div className='profile-card-bottom' onClick={()=>navigate('/profile?edit=1')} style={{cursor:"pointer"}}>
           <Button fullWidth variant='contained'>Edit Profile</Button>
           <Button fullWidth variant='outlined' startIcon={<BookmarkIcon></BookmarkIcon>} sx={{marginTop:2}}>My Saved</Button>
        </div>
       </>:<>
        <div className='profile-card-top'>
        <div>
            <Avatar src={userill}></Avatar>
        </div>
        </div>
        <div className='profile-card-details'>
            <p>About this website</p>
        </div>
        <div className='profile-card-followers'>
            <p>This is a Website to help you in your programming journey</p>
            <ul style={{color:"gray",fontSize:"12px"}}>
                <li>See solutions of famous problems</li>
                <li>Diffrent platform problems solution at a single place</li>
            </ul>
        </div>
        <div className='profile-card-bottom'>
           <button>Login/Signin</button>
        </div>
       
       </>}
    </div>
  )
}

export default ProfileCard