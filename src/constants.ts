import BigNumber from 'bignumber.js';

export const CURRENCIES = ['USD', 'RUB', 'GBP'];

export const BIG_NUMBER_SETTINGS = {
  ROUNDING_MODE: BigNumber.ROUND_DOWN,
  FORMAT: {
    groupSeparator: ' ',
    decimalSeparator: '.',
    groupSize: 3,
  },
};
