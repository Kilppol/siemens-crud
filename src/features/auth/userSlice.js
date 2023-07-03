// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null, // Estado inicial: no hay usuario autenticado
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			const { id, name, email } = action.payload;
			state.user = { id, name, email };
		},
		clearUser: (state) => {
			state.user = null;
		},
	},
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
