
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import profile from './../../static/profile.jpeg';
import axios from 'axios';
import path from '../../path';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, TextField, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { useState } from 'react';




let s = `// C++ program to implement iterative Binary Search
#include <bits/stdc++.h>
using namespace std;

// An iterative binary search function.
int binarySearch(int arr[], int l, int r, int x)
{
	while (l <= r) {
		int m = l + (r - l) / 2;

		// Check if x is present at mid
		if (arr[m] == x)
			return m;

		// If x greater, ignore left half
		if (arr[m] < x)
			l = m + 1;

		// If x is smaller, ignore right half
		else
			r = m - 1;
	}

	// If we reach here, then element was not present
	return -1;
}

// Driver code
int main(void)
{
	int arr[] = { 2, 3, 4, 10, 40 };
	int x = 10;
	int n = sizeof(arr) / sizeof(arr[0]);
	int result = binarySearch(arr, 0, n - 1, x);
	(result == -1)
		? cout << "Element is not present in array"
		: cout << "Element is present at index " << result;
	return 0;
}
`;

const Post = ({data})=>{

   
    const code = data ? data.postCode?.split(/\n/g) : s.split(/\n/g);
    const [time,setTime] = React.useState("");
    const user = useSelector(s=>s.user.user);
    const [likes,setLikes] = useState(data?.likes?.length);
    const [commentInputshow,setCommentInput] = React.useState(false);

    React.useEffect(()=>{
        const date1 = new Date();
        const date2 = new Date(data.createdAt);
        const diffTime = Math.abs(date2 - date1); 
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        const diffMins = Math.ceil(diffTime/(1000*60));
    
        if(diffMins>60){
            setTime(diffDays+" Hours Ago");
        }else{
            setTime(diffMins+" mins Ago");
        }

    },[]);

    const addLike = async ()=>{
        const response = await axios.post(`${path}addlike`,{
            user:user._id,
            post:data._id
        });
        if(response.data.success){
            setLikes(likes+1);
        }
    };

    return <div className="post">
    <div className="post-head">
        <Avatar src={profile}></Avatar>
        <div className="post-head-details">
            <p>{data?.user?.firstname+" "+data?.user?.lastname}</p>
            <span>{data?.user?.designation}</span>
            <span>{time}</span>
        </div>
        <div className="post-head-tools">
            <MoreHorizIcon></MoreHorizIcon>
        </div>
    </div>
    <div className="post-body">
        <span>{data.title}</span>
        <div>{code.map((ele)=><p>{ele}</p>)}</div>
    </div>
    <div className="post-lower">


    <div className='post-lower-count'>
        <Tooltip>
        <p>{likes+" "}<span>Likes</span></p>
        </Tooltip>
        <Tooltip title='see Comments'>
        <p>{data.comments?.length+" "}<span><CommentIcon sx={{color:"gray"}}></CommentIcon></span></p>
        </Tooltip>
    </div>

     <div className='post-lower-group'> 
     <div>
    <Button variant="text" startIcon={<FavoriteBorderIcon></FavoriteBorderIcon>} onClick={addLike}>Like</Button>
     </div>
     <div>
     <Tooltip title="add comment">
     <Button variant="text" startIcon={<AddCommentIcon></AddCommentIcon>} onClick={()=>setCommentInput(!commentInputshow)}>Comment</Button>
     </Tooltip>
     </div>
     <div>
    <Button variant="text" startIcon={<BookmarkBorderIcon></BookmarkBorderIcon>}>Save</Button>
     </div>
     <div>
    <Button variant="text" startIcon={<ShareIcon></ShareIcon>}>Share</Button>
     </div>
     </div>
    {
        commentInputshow ? <div className='comment-edit'>
        <span>Comment</span>
        <input type='text' placeholder='Type here'></input>
        </div>
        :""
    }
     

    </div>
</div>
}
export default Post;