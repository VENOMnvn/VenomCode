import React from 'react'
import { Avatar } from '@mui/material';
import userill from '../../static/userill.jpg';
import { Link } from 'react-router-dom';

const LoginWarning = () => {
    return <>
    <div className="fullscreen centerAll">
               <Avatar src={userill} sx={{width:"200px",height:"200px"}}></Avatar>
               <p>OOPS ! you are not loggedin 
                </p>
                <span>Please Login First</span>
               <Link to={'/login'}>
               <button>
                    Signin
               </button>
               </Link>
    </div>
    </>;
};

export default LoginWarning