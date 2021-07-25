import { createSlice } from '@reduxjs/toolkit';

export interface Account {
  account: string;
  currency: string;
  balance: number;
}

// I know that frontend'll probably get an array from api. In that case we'll need to add a mapping function to change the structure
// but i decided to make my life a little bit easier, so i use transformed version from the start. Hope you don't mind :)
interface History {
  [date: string]: [
    {
      date: string;
      amount: string;
      type: 'exchange';
      currency: string;
      transaction_sign: '+' | '-';
    }
  ];
}

interface MainState {
  accounts: Account[];
  activeAccount: Account;
  history: History;
}

const initialState: MainState = {
  accounts: [
    {
      account: '1234',
      currency: 'USD',
      balance: 100,
    },
    {
      account: '5',
      currency: 'GBP',
      balance: 130,
    },
  ],
  activeAccount: {
    account: '1234',
    currency: 'USD',
    balance: 100,
  },
  history: {},
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeActiveAccount: (state, action) => {
      state.activeAccount = action.payload;
    },
  },
});

export const actions = mainSlice.actions;

export default mainSlice.reducer;
