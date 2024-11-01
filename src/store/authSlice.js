// src/store/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for login
export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/login', { email, password });
        // console.log('Login response:', response.data); // Log respons untuk pemeriksaan
        localStorage.setItem('token', response.data.data.token);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Async thunk for registration
export const register = createAsyncThunk('auth/register', async ({ email, password, first_name, last_name }, thunkAPI) => {
    try {
        const response = await axios.post('https://take-home-test-api.nutech-integrasi.com/registration', {
            email,
            password,
            first_name,
            last_name,
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

// Main auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle login cases
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Login failed';
            })

            // Handle registration cases
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Registration failed';
            });
    },
});

export default authSlice.reducer;
