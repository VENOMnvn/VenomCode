import { createSlice } from "@reduxjs/toolkit";
const utilitySlice = createSlice({
  name:"utility", 
  initialState:{
    filter:[]
  },
  reducers:{
        addFilter : (state,action)=>{
          
            state.filter.push(action.payload);
            return;
        },
        removeFilter : (state,action)=>{
            state.filter = state.filter.filter((ele)=> ele != action.payload);
        }
  }
})

export const { addFilter,removeFilter} = utilitySlice.actions;

export default utilitySlice.reducer;