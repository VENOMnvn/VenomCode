import Send from "@mui/icons-material/Send";
import { Avatar, Icon, IconButton, TextField, Tooltip } from "@mui/material";
import { TextInput } from "keep-react";
import {Share,Notepad,ChatDots,Lightning} from 'phosphor-react';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Popup from './../common/popup';
import CreatePostPopup from "../common/CreatePost";
import axios from "axios";
import image from './../../static/userill.jpg';
import path from "../../path";
import CreatePost from "../problemPage/CreateQuestion";
import { Link } from "react-router-dom";
import PopUp from "./../common/popup";
const DirectsContainer = ()=>{
    const user = useSelector(s => s.user.userDB);
    const [directs,setDirects] = useState(null);

    const getDirects = async ()=>{
        try{

            const directs_response = await axios.post(`${path}mydirects`,{
                user:user.username,
                limit:15
            })
            if(directs_response.data.resp){
                setDirects(directs_response.data.resp);
            }
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getDirects();
    },[]);

    return <div className="divide-y w-full direct-page"> {
        directs?.map((ele)=> <div className="direct direct-full">
        <div className="direct-left">
            
        <Avatar src={ele.profilePicture} className="mr-2"></Avatar>
        <p className="text-[#92959b] font-thin">
        <strong className="mr-2 text-black">{ele.username}</strong> 
        {ele.msg}
        </p>
        </div>
        <div className="direct-right"> 
        <span style={{color:"lightgray"}}>{ele.createdAt?.split('T')[0]}</span>
        <IconButton>
            <Lightning size={24}></Lightning>
        </IconButton>
        </div>
        </div>
        )
    }
    </div>;
};




const MyDirects = ()=>{

    const user = useSelector(s => s.user.userDB);
    const [fullDirects,setfullDirects] = useState(false);
    const [directs,setDirects] = useState(null);
    const cancelFullDirect = ()=>{
        setfullDirects(false);
    }

    const getDirects = async ()=>{
        try{

            const directs_response = await axios.post(`${path}mydirects`,{
                user:user.username,
                limit:3
            })

            console.log(directs_response);
            
            if(directs_response.data.resp){
                setDirects(directs_response.data.resp);
            }

        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getDirects();
    },[]);

    return <>
    <div className="my-directs border border-slate-300">
    {fullDirects ? <PopUp element={<DirectsContainer></DirectsContainer>} heading="My Directs"  cancel={cancelFullDirect}></PopUp>:""}
    <div className="my-directs-top">
        <h2 className="mx-2">Recents Directs</h2> 
            <Lightning size={12} weight="fill"></Lightning>
    </div>
    <div className="directs divide-y">
        {
            !user ? <div className="directs-not-found">
                    <Avatar src={image}></Avatar>
                    <Link to="/login"> Login </Link>
                    <p> to access Directs</p>
            </div> :""
        }
        {
            !directs ? <div className="directs-not-found">
                <p>No Directs Now</p>
            </div>:""
        }
        {
            directs?.map((ele)=> <div className="direct">
            <Avatar src={ele.profilePicture} className="mr-2"></Avatar>
            <p className="text-[#92959b] font-thin">
            <strong className="mr-2 text-black">{ele.username}</strong> 
            {ele.msg}
            </p>
            </div>)
        }
    </div>
    <div className="direct-bottom" onClick={()=>setfullDirects(true)}>View Full</div>
    </div>
    </>;
}
export default MyDirects;
export {DirectsContainer};