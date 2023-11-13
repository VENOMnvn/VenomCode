import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import * as React from 'react';
import Stack from '@mui/material/Stack';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import ShareIcon from '@mui/icons-material/Share';


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

const Post = ()=>{

    
    const code = s.split(/\n/g);
   
    return <div className="post">
    <div className="post-head">
        <Avatar className="post-head-avatar">N</Avatar>
        <div className="post-head-details">
            <p>Naveen Chaudhary</p>
            <span>Web Developer</span>
            <span>14 ha go</span>
        </div>
        <div className="post-head-tools">
            <MoreHorizIcon></MoreHorizIcon>
        </div>
    </div>
    <div className="post-body">
        <span>Binary Search in 2 lines</span>
        <div>{code.map((ele)=><p>{ele}</p>)}</div>
    </div>
    <div className="post-lower">
     <div className='post-lower-group'>
     <div>
   
    <Button variant="text" startIcon={<FavoriteBorderIcon></FavoriteBorderIcon>}>Like</Button>
     </div>
     <div>
    <Button variant="text" startIcon={<CommentIcon></CommentIcon>}>Comment</Button>
     </div>
     <div>
    <Button variant="text" startIcon={<BookmarkBorderIcon></BookmarkBorderIcon>}>Save</Button>
     </div>
     <div>
    <Button variant="text" startIcon={<ShareIcon></ShareIcon>}>Share</Button>
     </div>
     </div>
    </div>
</div>
}
export default Post;