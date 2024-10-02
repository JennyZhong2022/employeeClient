import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  name: string;
  employmentStatus: string;
  employmentBasis: string;
}

const initialState: FilterState = {
  name: "",
  employmentStatus: "",
  employmentBasis: "",
};

export const FilterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<string>) => {
      state.employmentStatus = action.payload;
    },
    setBasisFilter: (state, action: PayloadAction<string>) => {
      state.employmentBasis = action.payload;
    },
    clearFilters: (state) => {
      state.name = "";
      state.employmentStatus = "";
      state.employmentBasis = "";
    },
  },
});

export const { setNameFilter, setStatusFilter, setBasisFilter, clearFilters } =
  FilterSlice.actions;

export default FilterSlice.reducer;
