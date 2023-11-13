import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user:false,
        proffesion:false,
        isProfileComplete:false
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
            return 
        },
        removeUser: (state, action) => {
            state.proffesion = false
            state.user = false ;
            return ;
        },
        addProffesion : (state,action) =>{
            state.proffesion = action.payload;
            return 
        }
    }
});

export const { addUser, removeUser ,addProffesion } = userSlice.actions;

export default userSlice.reducer;