
import { useState } from 'react';
import Post from './Post';
import axios from 'axios';
import path from '../../path';
import { Button, Skeleton } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const PostSkeleton = ()=>{
    return <>
            <div style={{width:"100%"}}>
            <div style={{display:"flex"}}>
            <Skeleton variant="circular"  animation="wave" width={50} height={50} ></Skeleton>
            <div style={{margin:"0px 5px"}}></div>
            <Skeleton variant="rectangular"  animation="wave" width={200} height={50} sx={{borderRadius:"8px"}}></Skeleton>
            </div>
            <div style={{margin:"15px 0px"}}></div>
            <Skeleton variant="rectangular"  animation="wave" width={"100%"} height={"400px"} ></Skeleton>
            <div style={{margin:"15px 0px"}}></div>
            <Skeleton variant="rectangular"  animation="wave" width={"100%"} height={"60px"} ></Skeleton>
            </div>
            <div style={{margin:"15px 0px"}}></div>
    </>;
}


const HomeFeed = ()=>{
    const arr = [1,2,3,45,6,7,8,9,10,342,523];
    const filters = useSelector(state=>state.utility.filter);

    const [posts,setPosts] = useState([]);
    const [limit,setLimit] = useState(12);
    const [page,setPage] = useState(0);
    const [load,setLoad] = useState(false);

    const fetchPost = async ()=>{
        console.log("nahi");
        setLoad(true);
        try{
            var postData;

            if(filters.length>0){
                 postData = await axios.post(`${path}postfilter?page=${page}&limit=${limit}`,{
                    filter:filters
                });
            }else{
                 postData = await axios.get(`${path}posts?page=${page}&limit=${limit}`);
            }
            setPosts(postData.data);
        }catch(err){
            console.log(err);
        }
        setLoad(false);
    };

    useEffect(()=>{
        console.log("yahanh dikt");
        fetchPost();
    },[page,filters]);


    return <div className="home-feed">
        {load ? <>
        <div className='centerAll' style={{flexDirection:"column"}}>
           <PostSkeleton></PostSkeleton>
           <PostSkeleton></PostSkeleton>
        </div>
        </>
        :( posts.length>0?
        <>
        {posts.map((ele)=>{
            return (<Post data={ele}></Post>);
        })}
        <div className='centerAll'>
        <Button sx={{margin:"auto"}} fullWidth onClick={()=>setPage((p)=>p+1)}>Load More</Button>
        </div>
        </>:(<>
            <p>No Post to Show</p>
        </>)
        )
        }
        
    </div>;
}

export default HomeFeed;