import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../Url";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",

}

export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) =>
{
    console.log('Payload diterima di LoginUser:', user); // Tambahkan logging di sini
    try {
        const response = await axios.post(`${BASE_URL}/login`, {
            email: user.email,
            password: user.password
        });

        return response.data;

    } catch (error) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message);
        }
    }

});

export const getMe = createAsyncThunk("user/getMe", async(_, thunkAPI) =>{
    try {
        const response = await axios.get(`${BASE_URL}/me`);
        return response.data;
    } catch (error) {
        if(error.response){
            const message = error.response.data.msg
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const LogOut = createAsyncThunk("user/LogOut", async() =>{
      await axios.delete(`${BASE_URL}/Logout`);
});

export const authSlice = createSlice
({ 
    name:"auth",
    initialState,
    reducers:{
        reset: (state) =>
            initialState
        },
        extraReducers:(builder) => {
            builder.addCase(LoginUser.pending, (state) => {
                state.isLoading = true;
            });
            builder.addCase(LoginUser.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            } );
            builder.addCase(LoginUser.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })


            // Get User Login
            builder.addCase(getMe.pending, (state) => {
                state.isLoading = true;
            });
            builder.addCase(getMe.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            } );
            builder.addCase(getMe.rejected, (state, action) =>{
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
        
    }


});

export const {reset} = authSlice.actions;
export default authSlice.reducer;