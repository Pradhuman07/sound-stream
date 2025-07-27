import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,                 // Stores user data after login/register
    isAuthenticated: false,     // Tracks authentication status
    loading: false,             // For loading states during API calls
    error: null                 // Stores any error messages
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart: (state) => {         // Start loading (Sets loading state when API call begins)
            state.loading = true;
            state.error = null;
        },

        authSuccess: (state, action) => {     // Handle success (Updates state after successful login/register)
            state.isAuthenticated = true;
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },

        authFailure: (state, action) => {       // Handle failure (Handles errors and resets state)
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = action.payload;
        },
        
        logout: (state) => {                    // Handle logout (Resets state when user logs out)
            state.isAuthenticated = false;
            state.user = null;
            state.loading = false;
            state.error = null;
        }
    }
});

export const {
    authStart,
    authSuccess,
    authFailure,
    logout
} = authSlice.actions;

export default authSlice.reducer;