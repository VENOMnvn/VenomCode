import { createSlice } from "@reduxjs/toolkit";
const utilitySlice = createSlice({
  name:"utility", 
  initialState:{
    filter:[],
    drawer:false,
    codeRunner:{},
  },
  reducers:{
        addFilter : (state,action)=>{
            state.filter.push(action.payload);
            return;
        },
        removeFilter : (state,action)=>{
            state.filter = state.filter.filter((ele)=> ele != action.payload);
        },
        setDrawer:(state,action)=>{
          console.log("RUnn");
          state.drawer = !state.drawer;
          return;
        },
        setCodeRunner:(state,action)=>{
          state.codeRunner = action.payload;
          return;
        }
  }
})

export const { addFilter,removeFilter,setDrawer,setCodeRunner} = utilitySlice.actions;

export default utilitySlice.reducer;