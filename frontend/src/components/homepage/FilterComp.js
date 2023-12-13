import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { addFilter,removeFilter } from '../../utils/slices/utilitySlice';
const Filter = () => {
  
  const filters = useSelector(state=>state.utility.filter);
  const dispatch = useDispatch();

    const handleDelete=(e)=>{
        console.log(e.target.innerHTML);
        dispatch(removeFilter(e.target.innerHTML));
    }
   

    const handlesubmit= (e)=>{
    
      if(e.target.value.length==0){
        return;
      }
      if(e.keyCode =="13"){
        dispatch(addFilter(e.target.value.toUpperCase()));
        e.target.value="";
      }
      
    };

  return (
    <div className="filter-container">
      <div className="filter-top"> 
        <p>
        Filter problems by category
        </p>
        <IconButton style={{
            backgroundColor:"#e4e6eb"
            }} >
            <TuneRoundedIcon></TuneRoundedIcon>
        </IconButton>
      </div>
      <TextField label="Labels" color="primary" focused className='filter-input' onKeyDown={handlesubmit} onFilled={handlesubmit} placeholder='i.e. LeetCode'/>
      <div className="filter-bottom">
      {
        filters.map((ele)=><span  onClick={handleDelete}><Tooltip title={"Delete"}><Chip label={ele} variant="outlined" onDelete={""}></Chip></Tooltip></span>)
      }
      </div>
    </div>
  );
};

export default Filter;
