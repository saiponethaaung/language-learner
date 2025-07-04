import { PaginationObject } from "@app/utils/grpc/type/common";
import { SectionObject } from "@app/utils/grpc/type/section";
import { LanguageObject } from "@app/utils/grpc/type/language";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SectionState {
  loading: boolean;
  data: SectionObject[];
  languages: LanguageObject[];
  pagination: PaginationObject;
}

const initialState: SectionState = {
  loading: false,
  data: [],
  languages: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const SectionSlice = createSlice({
  name: "section",
  initialState: initialState,
  reducers: {
    setSections(state, action: PayloadAction<SectionObject[]>) {
      state.data = action.payload;
    },
    setPagination(state, action: PayloadAction<PaginationObject>) {
      state.pagination = action.payload;
    },
    setLanguages(state, action: PayloadAction<LanguageObject[]>) {
      state.languages = action.payload;
    },
  },
});

export const { setSections, setPagination, setLanguages } =
  SectionSlice.actions;

export const section = SectionSlice.reducer;
