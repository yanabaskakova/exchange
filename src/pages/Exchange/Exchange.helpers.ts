import { CURRENCY_LIST } from 'pages/Exchange/Exchange.constants';

export const getCurrencyBySymbol = (symb: string) =>
  CURRENCY_LIST.find(({ value }) => value === symb.toLowerCase());
