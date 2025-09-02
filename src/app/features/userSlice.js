import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null   
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        login:(state,{payload})=>{
            state.user=payload
        },
        logaut:(state,{payload})=>{
            state.user=null

        },
    }
})
export const {login,logaut}=userSlice.actions
export default userSlice.reducer