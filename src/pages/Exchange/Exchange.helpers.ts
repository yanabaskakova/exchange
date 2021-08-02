import { CURRENCY_LIST } from 'pages/Exchange/Exchange.constants';
import { Account } from 'pages/Main/mainSlice';

import { ValidationRule } from './types';

export const getCurrencyBySymbol = (symb: string) =>
  CURRENCY_LIST.find(({ value }) => value === symb.toLowerCase());

export const checkRules = (rules: ValidationRule[], value: string) => {
  return rules.some((rule) => !rule(value));
};

export const isEmpty = (value: string) => {
  return value === '';
};

export const getOptionsFromAccounts = (accounts: Account[]) => {
  return accounts.map((account) => {
    return {
      id: account.account,
      label: account.currency.toUpperCase(),
      value: account.currency,
    };
  });
};
