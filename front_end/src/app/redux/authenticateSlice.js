import { createSlice } from "@reduxjs/toolkit";
import { loadState } from "./loadState";
import { saveState } from "./saveState";

const initialState = loadState("authenticate");

export const authenticateSlice = createSlice({
  name: "authenticate",
  initialState: initialState ?? {},
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload;
      saveState(state, "authenticate");
    },
    logout: (state) => {
      state.userInfo = {};
      saveState(state, "authenticate");
    },
  },
});

export const { login, logout } = authenticateSlice.actions;

export default authenticateSlice.reducer;
