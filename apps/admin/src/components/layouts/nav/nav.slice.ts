import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NavLink {
  title: string;
  href: string;
}

export interface NavState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  links: NavLink[];
}

const initialState: NavState = {
  links: [],
};

const authSlice = createSlice({
  name: "nav",
  initialState: initialState,
  reducers: {
    setLinks(state, action: PayloadAction<Array<NavLink>>) {
      state.links = [];
      state.links = action.payload;
    },
    resetNav(state) {
      for (const key in initialState) {
        state[key as keyof NavState] = initialState[key as keyof NavState];
      }
    },
  },
});

export const { setLinks, resetNav } = authSlice.actions;

export const nav = authSlice.reducer;
