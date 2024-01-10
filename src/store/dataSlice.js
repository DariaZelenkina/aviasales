/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getSearchId = createAsyncThunk(
  'data/getSearchId',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://aviasales-test-api.kata.academy/search");
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data.searchId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    tickets: [],
    index: 5,
    allDisplayed: false,
    allFetched: false,
    searchId: null,
    status: null,
    error: null,
  },
  reducers: {
    loadMore(state) {
      state.index += 5;
      if (state.index >= state.tickets.length) {
        state.allDisplayed = true;
      } else {
        state.allDisplayed = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(getSearchId.rejected, setError)
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'resolved';
        state.error = null;
        state.allFetched = action.payload.stop;
        state.tickets = [...state.tickets, ...action.payload.tickets];
      })
      .addCase(fetchData.rejected, setError);
  },
});

export const { loadMore } = dataSlice.actions;

export default dataSlice.reducer;
