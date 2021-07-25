import getSymbolFromCurrency from 'currency-symbol-map';
import { FC } from 'react';

import { getCurrencyBySymbol } from 'pages/Exchange/Exchange.helpers';

import { BalanceInfo, CurrencyData, CurrencyLabel } from './CurrencyInfo.styles';

interface Props {
  currency: string;
  balance?: string;
  className?: string;
}

const CurrencyInfo: FC<Props> = ({ className, balance, currency }) => {
  const currencyInfo = getCurrencyBySymbol(currency);
  const curr = getSymbolFromCurrency(currency);

  return (
    <CurrencyData className={className}>
      <CurrencyLabel>{currencyInfo?.label}</CurrencyLabel>
      <BalanceInfo>
        You have {balance} {curr}
      </BalanceInfo>
    </CurrencyData>
  );
};

export default CurrencyInfo;
