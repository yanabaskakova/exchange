import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Currency = 'usd' | 'gbp' | 'rub';

export interface Account {
  account: string;
  currency: Currency;
  balance: number;
}

export interface HistoryItem {
  sourceAccount: Account;
  date: string;
  targetAccount: Account;
  sourceAmount: string;
  targetAmount: string;
}

interface MainState {
  accounts: Account[];
  activeAccount: Account;
  history: HistoryItem[];
}

const accounts: Account[] = [
  {
    account: 'usd',
    currency: 'usd',
    balance: 100,
  },
  {
    account: 'gbp',
    currency: 'gbp',
    balance: 130,
  },
  {
    account: 'rub',
    currency: 'rub',
    balance: 100,
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

      state.accounts[sourceIdx].balance -= Number(sourceAmount);
      state.accounts[targetIdx].balance += Number(targetAmount);

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
