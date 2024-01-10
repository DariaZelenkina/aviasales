import { configureStore } from '@reduxjs/toolkit';
import sortingReducer from "./sortingSlice";
import filterReducer from "./filterSlice";
import dataReducer from "./dataSlice";

export default configureStore({
  reducer: {
    sorting: sortingReducer,
    filters: filterReducer,
    data: dataReducer,
  },
});
