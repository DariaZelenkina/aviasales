import { createSlice } from "@reduxjs/toolkit";

const sortingSlice = createSlice({
  name: 'sorting',
  initialState: {
    sorting: '',
  },
  reducers: {
    selectSorting(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.sorting = action.payload.option;
    },
  },
});

export const { selectSorting } = sortingSlice.actions;

export default sortingSlice.reducer;
