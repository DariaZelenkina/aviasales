/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

function allTransferFiltersChecked(filtersObj) {
  const filters = Object.values(filtersObj);
  let result = true;
  if (filters.includes(false)) {
    result = false;
  }
  return result;
}

const filterSlice = createSlice({
  name: 'filters',
  initialState: {
    filters: {
      all: true,
      transfers: {
        noTransfers: true,
        oneTransfer: true,
        twoTransfers: true,
        threeTransfers: true,
      },
    },
  },
  reducers: {
    selectAllFilter(state) {
      const filters = Object.keys(state.filters.transfers);
      state.filters.all = !state.filters.all;

      if (state.filters.all) {
        filters.forEach((filter) => {
          state.filters.transfers[filter] = true;
        });
      } else {
        filters.forEach((filter) => {
          state.filters.transfers[filter] = false;
        });
      }
    },
    selectTransfersFilter(state, action) {
      const filterName = action.payload.filter;
      state.filters.transfers[filterName] = !state.filters.transfers[filterName];
      if (state.filters.all && !state.filters.transfers[filterName]) {
        state.filters.all = false;
      }
      if (allTransferFiltersChecked(state.filters.transfers)) {
        state.filters.all = true;
      }
    },
  },

});

export const { selectAllFilter, selectTransfersFilter } = filterSlice.actions;

export default filterSlice.reducer;
