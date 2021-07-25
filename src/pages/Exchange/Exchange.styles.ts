import styled from 'styled-components';

import CurrencyInput from 'components/CurrencyInput';
import Icon from 'components/Icon';

export const ExchangePage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const CurrencyInputTo = styled(CurrencyInput)`
  margin-top: 5px;
`;

export const Wrapper = styled.div`
  position: relative;
`;

export const StyledIcon = styled(Icon)`
  display: inline-flex;

  svg {
    width: 16px;
    height: 16px;
    fill: #bbb;
    transition: fill 0.15s linear;
  }
`;

export const SwitchArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 34px;
  height: 34px;
  background-color: #fff;
  border: 2px solid #f9faff;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.15s linear;

  &:hover {
    background-color: #f9faff;
    ${StyledIcon} {
      svg {
        fill: #3273f0;
      }
    }
  }
`;

export const Rate = styled.div`
  font-size: 14px;
  padding: 5px 10px;
  text-align: center;
  color: #555;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.15s linear;
  border-radius: 5px;
  &:hover {
    background-color: #e1ebfe;
  }
`;

export const ReversedRate = styled.div`
  text-align: end;
  width: 100%;
  font-size: 14px;
  color: #555;
  margin-top: 5px;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const DropdownIcon = styled(Icon)`
  margin-left: 5px;
  display: inline-flex;
  svg {
    height: 10px;
    width: 10px;
    fill: #555;
  }
`;
