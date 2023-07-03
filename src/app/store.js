import { configureStore } from '@reduxjs/toolkit';
import sustanciaReducer from '../features/sustancias/sustanciaSlice';
import authReducer from '../features/auth/userSlice';

export const store = configureStore({
	reducer: {
		sustancias: sustanciaReducer,
		auth: authReducer,
	},
});
