export type Currency = 'usd' | 'gbp' | 'rub';

export interface Account {
  account: string;
  currency: Currency;
  balance: string;
}

export interface HistoryItem {
  sourceAccount: Account;
  date: string;
  targetAccount: Account;
  sourceAmount: string;
  targetAmount: string;
}

export interface MainState {
  accounts: Account[];
  activeAccount: Account;
  history: HistoryItem[];
}
