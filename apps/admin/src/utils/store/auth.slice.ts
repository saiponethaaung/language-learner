import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminObject } from "../grpc/type/admin";

export interface UserState {
  user: AdminObject;
}

const initialState: UserState = {
  user: {
    id: 0,
    name: "",
    email: "",
    createdAt: "",
    updatedAt: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAdmin(state, action: PayloadAction<AdminObject>) {
      state.user = action.payload;
    },
  },
});

export const { setAdmin } = authSlice.actions;

export const auth = authSlice.reducer;
