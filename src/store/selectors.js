import { createSelector } from "@reduxjs/toolkit";

export const selectAllData = (state) => state.data.tickets;
export const selectAllFetched = (state) => state.data.allFetched;
export const selectAllDisplayed = (state) => state.data.allDisplayed;
export const selectError = (state) => state.data.error;
export const selectFilters = (state) => state.filters.filters;
export const selectIndex = (state) => state.data.index;
export const selectSortingParameter = (state) => state.sorting.sorting;

export const selectDataByFilters = createSelector(
  [selectAllData, selectFilters],
  (allData, allFilters) => {
    const { all, transfers } = allFilters;
    if (all) {
      return allData;
    }
    let filteredData = [];
    if (transfers.noTransfers) {
      filteredData = [...allData.filter(
        (item) => item.segments[0].stops.length === 0 || item.segments[1].stops.length === 0,
      )];
    }
    if (transfers.oneTransfer) {
      filteredData = [...allData.filter(
        (item) => item.segments[0].stops.length === 1 || item.segments[1].stops.length === 1,
      )];
    }
    if (transfers.twoTransfers) {
      filteredData = [...allData.filter(
        (item) => item.segments[0].stops.length === 2 || item.segments[1].stops.length === 2,
      )];
    }
    if (transfers.threeTransfers) {
      filteredData = [...allData.filter(
        (item) => item.segments[0].stops.length === 3 || item.segments[1].stops.length === 3,
      )];
    }
    return filteredData;
  },
);

export const selectSortedData = createSelector(
  [selectDataByFilters, selectSortingParameter],
  (data, sorting) => {
    const sortedData = [...data];
    switch (sorting) {
      case "cheapest":
        return sortedData.sort((a, b) => a.price - b.price);
      case "fastest":
        return sortedData.sort((a, b) => (a.segments[0].duration + a.segments[1].duration)
        - (b.segments[0].duration + b.segments[1].duration));
      case "optimal":
        return sortedData.sort((a, b) => (a.segments[0].duration + a.segments[1].duration + a.price)
        - (b.segments[0].duration + b.segments[1].duration + b.price));
      default:
        break;
    }
    return sortedData;
  },
);
