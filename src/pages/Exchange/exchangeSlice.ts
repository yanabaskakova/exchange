import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';

import { Account } from 'pages/Main/types';

import { State } from './types';

export const initialState: State = {
  status: 'idle',
  error: null,
  valueFrom: '',
  valueTo: '',
  targetAccount: null,
};

const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    changeValueFrom: (state, action: PayloadAction<{ valueFrom?: string; rate: number }>) => {
      const { valueFrom = state.valueFrom, rate } = action.payload;
      const valueTo = valueFrom ? new BigNumber(valueFrom).multipliedBy(rate) : '';

      state.valueFrom = valueFrom;
      state.valueTo = valueTo.toString();
    },
    changeValueTo: (state, action: PayloadAction<{ valueTo?: string; rate: number }>) => {
      const { valueTo = state.valueTo, rate } = action.payload;
      const valueFrom = valueTo ? new BigNumber(valueTo).dividedBy(rate) : '';

      state.valueTo = valueTo;
      state.valueFrom = valueFrom.toString();
    },
    changeTargetAccount: (state, action: PayloadAction<{ targetAccount: Account }>) => {
      state.targetAccount = action.payload.targetAccount;
    },
  },
});

export const reducer = exchangeSlice.reducer;
export const actions = exchangeSlice.actions;
