import getSymbolFromCurrency from 'currency-symbol-map';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { getRates } from 'services/rates';

import Button from 'components/Button';
import CurrencyInput from 'components/CurrencyInput';

import {
  Actions,
  CurrencyInputTo,
  DropdownIcon,
  ExchangePage,
  Rate,
  ReversedRate,
  StyledIcon,
  SwitchArrow,
  Wrapper,
} from './Exchange.styles';

const Exchange = () => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [valueFrom, setValueFrom] = useState<string>('0');
  const [valueTo, setValueTo] = useState<string>('0');

  const ratesTo: number = useMemo(() => rates['gbp'.toUpperCase()], [rates]);
  const ratesFrom = useMemo(() => (ratesTo ? 1 / ratesTo : undefined), [ratesTo]);

  const fetchRates = async () => {
    const { data } = await getRates();
    setRates(data.rates);
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const getCalculatedValue = (value: string, rate?: number) => {
    if (!rate || !value) return 0;

    const calculated = rate * Number(value);

    return Number.isNaN(calculated) ? 0 : calculated;
  };

  const handleValueFromChange = (value: string) => {
    setValueFrom(value);

    const val = getCalculatedValue(value, ratesTo);

    setValueTo(val.toFixed(2));
  };

  const handleValueToChange = (value: string) => {
    setValueTo(value);

    const val = getCalculatedValue(value, ratesFrom);
    setValueFrom(val.toFixed(2));
  };

  return (
    <ExchangePage>
      <Rate>
        {getSymbolFromCurrency('usd')} 1 = {getSymbolFromCurrency('gbp')} {rates['gbp'.toUpperCase()]}{' '}
        <DropdownIcon icon="arrow-down" />
      </Rate>
      <Wrapper>
        <CurrencyInput
          value={valueFrom}
          onChange={handleValueFromChange}
          currency="usd"
          balance="100"
          checkBalance
        />
        <CurrencyInputTo value={valueTo} onChange={handleValueToChange} currency="gbp" balance="50" />
        <SwitchArrow>
          <StyledIcon icon="arrow-down" />
        </SwitchArrow>
      </Wrapper>
      {ratesFrom ? (
        <ReversedRate>
          {getSymbolFromCurrency('gbp')} 1 = {getSymbolFromCurrency('usd')} {_.round(ratesFrom, 2)}
        </ReversedRate>
      ) : undefined}

      <Actions>
        <Button>Exchange</Button>
      </Actions>
    </ExchangePage>
  );
};

export default Exchange;
