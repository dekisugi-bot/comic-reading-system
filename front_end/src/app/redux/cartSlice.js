import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const itemIndex = state.findIndex(
        (e) => e.product.id === action.payload.product.id
      );
      if (itemIndex !== -1) {
        state[itemIndex].quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
    },
    changeQuantity: (state, action) => {
      const itemIndex = state.findIndex(
        (e) => e.product.id === action.payload.id
      );
      state[itemIndex].quantity = action.payload.quantity;
    },
    removeItemInCart: (state, action) => {
      const itemIndex = state.findIndex(
        (e) => e.product.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state = state.splice(itemIndex, 1);
      }
    },
  },
});

export const { addToCart, changeQuantity, removeItemInCart } =
  cartSlice.actions;

export default cartSlice.reducer;
