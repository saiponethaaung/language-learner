import { PaginationObject } from "@app/utils/grpc/type/common";
import { LanguageObject } from "@app/utils/grpc/type/language";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LanguageState {
  loading: boolean;
  data: LanguageObject[];
  pagination: PaginationObject;
}

const initialState: LanguageState = {
  loading: false,
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const LanguageSlice = createSlice({
  name: "language",
  initialState: initialState,
  reducers: {
    setLanguages(state, action: PayloadAction<LanguageObject[]>) {
      console.log("setting languages", action.payload);
      state.data = action.payload;
    },
    setPagination(state, action: PayloadAction<PaginationObject>) {
      state.pagination = action.payload;
    },
  },
});

export const { setLanguages, setPagination } = LanguageSlice.actions;

export const language = LanguageSlice.reducer;
