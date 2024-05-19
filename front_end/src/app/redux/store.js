import { configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "./authenticateSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    authenticate: authenticateReducer,
    cart: cartReducer,
  },
});

export default store;
