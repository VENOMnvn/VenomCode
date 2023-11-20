import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { Tooltip } from '@mui/material';
const Filter = () => {
  
    const handleDelete=(e)=>{
        console.log(e.target.innerHTML);
        const result = labelArray.filter((ele)=>ele != e.target.innerHTML);
        setLabelArray(result);
    }

    const [labelArray,setLabelArray] = useState(["LeetCode","HackerRank"]);
    const handlesubmit= (e)=>{
      if(e.key=="Enter"){
        setLabelArray([...labelArray,e.target.value]);
        e.target.value="";
      }

    };

  return (
    <div className="filter-container">
      <div className="filter-top">
        Filter problems by category
      </div>
      <TextField label="Labels" color="primary" focused className='filter-input' onKeyDown={handlesubmit} onFilled={handlesubmit} placeholder='i.e. LeetCode'/>
      <div className="filter-bottom">
      {
        labelArray.map((ele)=><span  onClick={handleDelete}><Tooltip title={"Delete"}><Chip label={ele} variant="outlined" onDelete={""}></Chip></Tooltip></span>)
      }
      </div>
    </div>
  );
};

export default Filter;
