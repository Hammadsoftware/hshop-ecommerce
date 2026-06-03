// src/redux/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // ✅ must be an array
  total: 0,
};


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
   setCart(state, action) {
  const newItem = action.payload.items;
  const newTotal = action.payload.total;

  // ✅ Add item to the array
  state.items.push(newItem);

  // ✅ Update total price
  state.total += newTotal;
},
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
      removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { setCart, clearCart,removeItem } = cartSlice.actions;
export default cartSlice.reducer;
