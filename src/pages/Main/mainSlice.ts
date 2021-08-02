import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import BigNumber from 'bignumber.js';

import { Account, MainState } from './types';

const accounts: Account[] = [
  {
    account: 'usd',
    currency: 'usd',
    balance: '1000000.129024912',
  },
  {
    account: 'gbp',
    currency: 'gbp',
    balance: '13000000.021241',
  },
  {
    account: 'rub',
    currency: 'rub',
    balance: '100000000.12904019502194',
  },
];

const initialState: MainState = {
  accounts,
  activeAccount: accounts[0],
  history: [],
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeActiveAccount: (state, action: PayloadAction<{ account: Account }>) => {
      state.activeAccount = action.payload.account;
    },
    exchange: (
      state,
      action: PayloadAction<{
        sourceAccount: Account;
        targetAccount: Account;
        sourceAmount: string;
        targetAmount: string;
      }>
    ) => {
      const { sourceAccount, targetAccount, sourceAmount, targetAmount } = action.payload;
      const sourceIdx = state.accounts.findIndex((account) => account.account === sourceAccount.account);
      const targetIdx = state.accounts.findIndex((account) => account.account === targetAccount.account);

      const sourceBalance = new BigNumber(sourceAccount.balance).minus(sourceAmount).toString();
      const targetBalance = new BigNumber(targetAccount.balance).plus(targetAmount).toString();

      state.accounts[sourceIdx].balance = sourceBalance;
      state.accounts[targetIdx].balance = targetBalance;

      state.activeAccount = state.accounts[sourceIdx];

      const date = new Date().toString();
      state.history.push({
        date,
        sourceAccount,
        targetAccount,
        sourceAmount,
        targetAmount,
      });
    },
  },
});

export const actions = mainSlice.actions;

export default mainSlice.reducer;
