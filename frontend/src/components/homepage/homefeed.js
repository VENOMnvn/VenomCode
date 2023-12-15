
import { useState } from 'react';
import Post from './Post';
import axios from 'axios';
import path from '../../path';
import { Button, Skeleton,Pagination } from '@mui/material';
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

    const filters = useSelector(state=>state.utility.filter);
    const [maxPage,setmaxPage] = useState(1);
    const [posts,setPosts] = useState([]);
    const [limit,setLimit] = useState(12);
    const [page,setPage] = useState(1);
    const [load,setLoad] = useState(false);

    const fetchPost = async ()=>{
        console.log("nahi");
        setLoad(true);
        try{
            var postData;
            if(filters.length>0){
                 
                postData = await axios.post(`${path}postfilter?page=${page-1}&limit=${limit}`,{
                    filter:filters
                });

            }else{
                 postData = await axios.get(`${path}posts?page=${page-1}&limit=${limit}`);
            }

            setPosts(postData.data);

        }catch(err){
            console.log(err);
        }
        setLoad(false);
    };

    const PageLength = async ()=>{
        try{

            const response = await axios.get(path+'postlength');
            if(response.data.count){

                const maxPageTemp = Math.ceil(response.data.count/limit);
                setmaxPage(maxPageTemp);
            }

        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        PageLength();
    },[]);

    useEffect(()=>{
        console.log(page);
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
        
        {/* {pagination is in app.css} */}
        <div className='pagination'>
        <Pagination count={maxPage} page={page} onChange={(e,v)=>setPage(v)} />
        </div>
       
        </>:(<>
            <p className='centerAll'>No Post to Show</p>
        </>)
        )
        }
        
    </div>;
}

export default HomeFeed;