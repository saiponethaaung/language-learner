import { PaginationObject } from "@app/utils/grpc/type/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SectionUnitObject } from "@app/utils/grpc/type/section_unit";

interface SectionUnitState {
  loading: boolean;
  data: SectionUnitObject[];
  pagination: PaginationObject;
}

const initialState: SectionUnitState = {
  loading: false,
  data: [],
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
};

const SectionUnitSlice = createSlice({
  name: "sectionUnit",
  initialState: initialState,
  reducers: {
    setSectionUnits(state, action: PayloadAction<SectionUnitObject[]>) {
      state.data = action.payload;
    },
    setPagination(state, action: PayloadAction<PaginationObject>) {
      state.pagination = action.payload;
    },
  },
});

export const { setSectionUnits, setPagination } = SectionUnitSlice.actions;

export const sectionUnit = SectionUnitSlice.reducer;
