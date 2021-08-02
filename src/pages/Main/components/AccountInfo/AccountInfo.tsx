import getSymbolFromCurrency from 'currency-symbol-map';
import { FC } from 'react';

import { getCurrencyBySymbol } from 'pages/Exchange/Exchange.helpers';
import { Account } from 'pages/Main/mainSlice';

import { Balance, CurrencyInfo, Wrapper } from './AccountInfo.styles';

interface Props {
  account: Account;
}

const AccountInfo: FC<Props> = ({ account }) => {
  const { currency, balance } = account;
  const currencyInfo = getCurrencyBySymbol(currency);
  const currSymbol = getSymbolFromCurrency(currency);

  return (
    <Wrapper>
      <Balance>
        {currSymbol} {balance.toFixed(2)}
      </Balance>
      <CurrencyInfo>
        {currencyInfo?.label} - {currencyInfo?.description}
      </CurrencyInfo>
    </Wrapper>
  );
};

export default AccountInfo;
