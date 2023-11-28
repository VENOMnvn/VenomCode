import { Avatar } from '@mui/material'
import React from 'react'
import profilePic from './../../static/profile.jpeg'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useSelector } from 'react-redux';
import userill from './../../static/userill.jpg';

const ProfileCard = () => {
    const user = useSelector(s=>s.user.user);
    const userDB = useSelector(s=>s.user.userDB);
    
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
            <p>People who follows you <span>69</span></p>
            <p>People who followed by you <span>69</span></p>
        </div>
        <div className='profile-card-bottom'>
            <BookmarkIcon sx={{color:"gray"}}></BookmarkIcon>{"  "}
            My items
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