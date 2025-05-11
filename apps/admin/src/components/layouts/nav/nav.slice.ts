import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NavLink {
  title: string;
  href: string;
}

export interface NavState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  links: {
    [key: string]: NavLink[];
  };
}

const initialState: NavState = {
  links: {},
};

const authSlice = createSlice({
  name: "nav",
  initialState: initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setLinks(
      state,
      action: PayloadAction<{ key: string; links: Array<NavLink> }>
    ) {
      state.links = {};
      state.links[action.payload.key] = action.payload.links;
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
