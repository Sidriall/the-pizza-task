import { createSlice, Draft } from '@reduxjs/toolkit';

const currencySlice = createSlice({
  name: 'currency',
  initialState: 'us',
  reducers: {
    switchCurrency: (state, { payload }) => {
      state = payload;
      return state;
    },
  },
});

export const selectCurrency = (state: Draft<any>) => state.currency;

export const { switchCurrency } = currencySlice.actions;

export default currencySlice.reducer;
