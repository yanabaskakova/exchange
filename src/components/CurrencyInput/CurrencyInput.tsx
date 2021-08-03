import getSymbolFromCurrency from 'currency-symbol-map';
import React from 'react';

import { useNumberInput, Value } from 'components/NumberInput/useNumberInput';
import Select from 'components/Select';
import { Option } from 'components/Select/types';
import { Currency } from 'pages/Main/types';

import * as S from './CurrencyInput.styled';

interface Props {
  className?: string;

  value?: string;
  currency: Currency;
  placeholder?: string;
  rules?: ((value: string) => boolean)[];

  options: Option<Currency>[];

  balance: string;
  prefix?: string;
  onChange: (value: Value) => void;
  onCurrencyChange: (option: Option<Currency>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      className,

      value,
      currency,
      placeholder,
      rules,

      options,

      balance,
      prefix,
      onChange,
      onCurrencyChange,
      onBlur,
    },
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
            dataTestId={`${prefix}-select`}
          />
          <S.Balance>
            You have {balance} {getSymbolFromCurrency(currency.toUpperCase())}
          </S.Balance>
        </S.SelectWrapper>
        <S.StyledInput
          ref={ref}
          data-testid={`${prefix}-input`}
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
