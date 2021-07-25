import { FC } from 'react';

import { isEqualOrLess, isNumber } from 'components/Input/Input.helpers';
import { AMOUNT_REGEXP } from 'pages/Exchange/Exchange.constants';

import { StyledCurrencyInfo, StyledInput, Wrapper } from './CurrencyInput.styles';

interface Props {
  currency: string;
  balance: string;
  className?: string;
  value?: string;
  checkBalance?: boolean;
  onChange: (value: string) => void;
}

const CurrencyInput: FC<Props> = ({ value, className, currency, balance, checkBalance, onChange }) => {
  const handleChange = (value: string) => {
    if (!AMOUNT_REGEXP.test(value)) {
      return;
    }

    onChange(value);
  };

  const isEqualOrLessThanBalance = (value: string) => isEqualOrLess(value, Number(balance));

  return (
    <Wrapper className={className}>
      <StyledInput
        startAdornment={<StyledCurrencyInfo currency={currency} balance={balance} />}
        rules={checkBalance ? [isNumber, isEqualOrLessThanBalance] : [isNumber]}
        value={value || ''}
        onChange={handleChange}
      />
    </Wrapper>
  );
};

export default CurrencyInput;
