import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    isHome: true,
  },
  reducers: {
    setHomePage: (state, { payload }) => {
      state.isHome = payload;
    },
  },
});

export const { setHomePage } = appSlice.actions;
export default appSlice.reducer;
