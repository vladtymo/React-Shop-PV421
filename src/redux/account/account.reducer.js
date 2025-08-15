import { createSlice } from '@reduxjs/toolkit'

export const accountSlice = createSlice({
    name: 'account',
    initialState: {
        email: null,
        isAuth: false
    },
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
            state.isAuth = true;
        },
        clearEmail: (state) => {
            state.email = null;
            state.isAuth = false;
        },
    },
});

export default accountSlice.reducer