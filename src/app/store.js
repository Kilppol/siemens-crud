import { configureStore } from '@reduxjs/toolkit';
import sustanciaReducer from '../features/sustancias/sustanciaSlice';

export const store = configureStore({
	reducer: {
		sustancias: sustanciaReducer,
	},
});
