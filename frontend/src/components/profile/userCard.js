import React, { useEffect, useState } from 'react';
import userill from './../../static/userill.jpg';
import './profile.css'
import { Button, Skeleton } from '@mui/material';
import axios from 'axios';
import path from '../../path';
import { Link } from 'react-router-dom';

const UserCard = ({username}) => {

    const [load ,setload] = useState(true);
    const [data,setData] = useState(false);
    
    const getUserData = async ()=>{
        setload(true);
        try{
            const response = await axios.get(`${path}getUser?username=${username}`);
            if(response.data.success){
              setData(response.data.user);
            }

        }catch(err){
        console.log(err);
        };
        setload(false);
    }

    useEffect(()=>{
        getUserData();
    },[]);


  return (<>{
    
    (!load && data) ? <div className='usercard'>
        <div className='usercard-img'>
            <img src={data?.profilePicture}></img>
        </div>
        <div className='usercard-username'>
           {data?.firstname + " "+data?.lastname}
        </div>
        <p>
           {username}
        </p>

        <Link to={`/user/${username}`} style={{width:"100%",padding:"3px 8px"}}>
        <Button  variant='contained' sx={{}} fullWidth >Visit</Button>
        </Link>
        <Link to={`/chat`} style={{width:"100%",padding:"3px 8px"}}>
        <Button  variant='outlined' sx={{}} fullWidth >Message</Button>
        </Link>
        
    </div> :
    <div className='usercard-skelton'>
           <Skeleton width={250} height={250} animation={"wave"}></Skeleton>
           <Skeleton width={200} height={30} animation={"wave"}></Skeleton>
           <Skeleton width={150} height={30} animation={"wave"}></Skeleton>
           <Skeleton width={200} height={50} animation={"wave"}></Skeleton>
    </div>
    }
  </>
  )
}

export default UserCard;