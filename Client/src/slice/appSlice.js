import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    isHome: true,
  },
  reducers: {
    setHomePage: (state, { payload }) => {
      state.isHome = payload;
      console.log(state.isHome, "store");
    },
  },
});

export const { setHomePage } = appSlice.actions;
export default appSlice.reducer;
