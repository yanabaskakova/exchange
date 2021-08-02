import BigNumber from 'bignumber.js';
import React from 'react';

import { useNumberInput, Value } from 'components/NumberInput/useNumberInput';
import Select from 'components/Select';
import { Option } from 'components/Select/types';
import { Currency } from 'pages/Main/mainSlice';

import * as S from './CurrencyInput.styled';

interface Props {
  currency: Currency;
  placeholder?: string;
  balance: string;
  className?: string;
  value?: string;
  checkBalance?: boolean;
  rules?: ((value: string) => boolean)[];
  options: Option<Currency>[];
  onChange: (value: Value) => void;
  onCurrencyChange: (option: Option<Currency>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const SUFFIX = {
  usd: '$',
  gbp: '£',
  rub: '₽',
};

const BN = BigNumber.clone({
  FORMAT: {
    groupSeparator: ' ',
    decimalSeparator: '.',
    groupSize: 3,
  },
});

const CurrencyInput = React.forwardRef<HTMLInputElement, Props>(
  (
    { value, placeholder, className, currency, balance, options, rules, onChange, onCurrencyChange, onBlur },
    ref
  ) => {
    const inputProps = useNumberInput({ rules, onChange, defaultValue: value, canEnterNonValidValue: false });

    const selectedOptions = options.filter((opt) => opt.value === currency);
    return (
      <S.Wrapper className={className}>
        <S.SelectWrapper>
          <Select
            ui="bigSelect"
            selectedOptions={selectedOptions}
            options={options}
            onChange={onCurrencyChange}
          />
          <S.Balance>
            You have {new BN(balance).toFormat(2)} {SUFFIX[currency]}
          </S.Balance>
        </S.SelectWrapper>
        <S.StyledInput
          ref={ref}
          placeholder={placeholder}
          value={inputProps.formattedValue}
          onChange={inputProps.onChange}
          onBlur={onBlur}
        />
      </S.Wrapper>
    );
  }
);

export default CurrencyInput;
