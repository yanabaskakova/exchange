import { Account } from 'pages/Main/types';

export type State = {
  status: 'idle' | 'loading' | 'error' | 'success';
  error: null | Error;
  valueFrom: string;
  valueTo: string;
  targetAccount: Account | null;
};

export type ValidationRule = (value: string) => boolean;
