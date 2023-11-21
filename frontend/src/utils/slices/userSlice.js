import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user:false
    },
    reducers: {
        addUser: (state, action) => {
            state.user = action.payload;
            return 
        },
        removeUser: (state, action) => {
            state.user = false ;
            return ;
        }
    }
});

export const { addUser,removeUser} = userSlice.actions;

export default userSlice.reducer;