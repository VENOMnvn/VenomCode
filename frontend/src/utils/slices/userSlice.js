import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user:false,
        userDB:false
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
            state.userDB = action.payload;
            return;
        },
        removeUser: (state, action) => {
            state.user = false ;
            return ;
        },
        addUserDB:(state,action)=>{
            state.userDB = action.payload;
        }
    }
});

export const { addUser,removeUser,addUserDB} = userSlice.actions;

export default userSlice.reducer;