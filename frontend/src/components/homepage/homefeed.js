
import { useState } from 'react';
import Post from './Post';
import axios from 'axios';
import path from '../../path';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import logo from './../../static/logocircle.png';

const HomeFeed = ()=>{
    const arr = [1,2,3,45,6,7,8,9,10,342,523];
    const filters = useSelector(state=>state.utility.filter);

    const [posts,setPosts] = useState([]);
    const [limit,setLimit] = useState(12);
    const [page,setPage] = useState(0);
    const [load,setLoad] = useState(false);

    const fetchPost = async ()=>{
        setLoad(true);
        try{
            var postData;

            if(filters.length>0){
                console.log("+2");
                 postData = await axios.post(`${path}postfilter?page=${page}&limit=${limit}`,{
                    filter:filters
                });
            }else{
                 postData = await axios.get(`${path}posts?page=${page}&limit=${limit}`);
            }
           
            console.log(postData);
            setPosts(postData.data);
        }catch(err){
            console.log(err);
        }
        setLoad(false);
    };

    useEffect(()=>{
        fetchPost();
    },[page,filters]);


    return <div className="home-feed">
        {load ? <>
        <div className='centerAll'>
             <div class="loader">
                <img src={logo}></img>
                Loading...
             </div>
        </div>
        </>
        :
        <>
        {posts.map((ele)=>{
            return (<Post data={ele}></Post>);
        })}
        <div className='centerAll'>
            <Button sx={{margin:"auto"}} fullWidth onClick={()=>setPage((p)=>p+1)}>Load More</Button>
        </div>
        </>
        }
        
    </div>;
}

export default HomeFeed;