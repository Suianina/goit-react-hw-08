import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearAuthHeader, instance, setAuthHeaders } from "../../service/instance";



export const registerAuth = createAsyncThunk(
        'auth/register',
        async (userData, thunkApi) => {
          try {
            const { data } = await instance.post('users/signup', userData);
            setAuthHeaders(data.token);
            return data;
          } catch (err) {
            return thunkApi.rejectWithValue(err.message);
          }
        }
      );

export const login = createAsyncThunk('auth/login',
        async(userData, thunkApi) => {
          try {
            const response = await instance.post('users/login', userData);
            const { token, user } = response.data; 
            setAuthHeaders(token);
            return { token, user };  
          } catch (error) {
            return thunkApi.rejectWithValue(error.message);
          }
        }
      )

export const logout = createAsyncThunk('auth/logout',
        async(_, thunkApi) => {
                try{
        await instance.post('users/logout')
        clearAuthHeader();
                }catch(error){
        return thunkApi.rejectWithValue(error.message)
                }
        }
)

export const refreshUser = createAsyncThunk('auth/refresh',
        async(_, thunkApi) => {
                try{
        const state = thunkApi.getState();
        const token = state.auth.token;
        setAuthHeaders(token)
        const { data } = await instance.get('users/current');
      return data;
                }catch(error){
        return thunkApi.rejectWithValue(error.message)
                }
        },
        {
                condition: (_, thunkApi) => {
                        const state = thunkApi.getState();
                        const token = state.auth.token;

                        if(token) return true;

                        return false;
                }
        }
)