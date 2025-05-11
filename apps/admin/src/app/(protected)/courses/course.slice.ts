import { PaginationObject } from "@app/utils/grpc/type/common";
import { CourseObject } from "@app/utils/grpc/type/course";
import { LanguageObject } from "@app/utils/grpc/type/language";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CourseState {
  loading: boolean;
  data: CourseObject[];
  languages: LanguageObject[];
  pagination: PaginationObject;
}

const initialState: CourseState = {
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

const CourseSlice = createSlice({
  name: "course",
  initialState: initialState,
  reducers: {
    setCourses(state, action: PayloadAction<CourseObject[]>) {
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

export const { setCourses, setPagination, setLanguages } = CourseSlice.actions;

export const course = CourseSlice.reducer;
