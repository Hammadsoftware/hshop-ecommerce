import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import userReducer from './userSlice'; // <-- import your user slice

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer, // <-- add user reducer
  },
});