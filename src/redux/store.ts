import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./searchSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
