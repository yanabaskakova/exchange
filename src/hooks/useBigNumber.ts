import BigNumber from 'bignumber.js';

import { BIG_NUMBER_SETTINGS } from '../constants';

const BN = BigNumber.clone(BIG_NUMBER_SETTINGS);

const useBigNumber = () => {
  return BN;
};

export default useBigNumber;
