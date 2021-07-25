import styled from 'styled-components/macro';

import Input from 'components/Input';

import CurrencyInfo from './components/CurrencyInfo';

export const StyledInput = styled(Input)`
  padding: 15px 20px;
  input {
    font-size: 20px;
    line-height: 1.5;
    padding: 10px;
    text-align: right;
  }
`;

export const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
`;

export const StyledCurrencyInfo = styled(CurrencyInfo)`
  width: 60%;
`;

export const StyledRate = styled.div`
  text-align: end;
  font-size: 14px;
  padding: 10px 20px;
`;
