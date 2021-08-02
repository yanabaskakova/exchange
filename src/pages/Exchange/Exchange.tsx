import BigNumber from 'bignumber.js';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useRates } from 'hooks';
import { useReducer } from 'react';
import { batch, shallowEqual } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'store';

import Button from 'components/Button';
import Loader from 'components/Loader';
import * as MainSlice from 'pages/Main/mainSlice';

import { BIG_NUMBER_SETTINGS } from '../../constants';
import Controls from './components/Controls';
import Top from './components/Top';
import { checkRules, isEmpty } from './Exchange.helpers';
import * as S from './Exchange.styles';
import * as Slice from './exchangeSlice';
import { ValidationRule } from './types';

const BN = BigNumber.clone(BIG_NUMBER_SETTINGS);

const Exchange = () => {
  const appDispatch = useAppDispatch();
  const { accounts, activeAccount } = useAppSelector(
    (state) => ({ accounts: state.main.accounts, activeAccount: state.main.activeAccount }),
    shallowEqual
  );

  const [state, dispatch] = useReducer<typeof Slice.reducer>(Slice.reducer, {
    ...Slice.initialState,
    targetAccount: accounts.filter((account) => account.account !== activeAccount.account)[0],
  });

  const { valueFrom, valueTo, targetAccount } = state;

  const rates = useRates();

  if (!rates || !targetAccount) return <Loader />;

  const rate = rates[targetAccount.currency.toUpperCase()] / rates[activeAccount.currency.toUpperCase()];

  const handleExchange = () => {
    if (disabled || !rate) return;

    batch(() => {
      appDispatch(
        MainSlice.actions.exchange({
          sourceAccount: activeAccount,
          targetAccount: targetAccount,
          sourceAmount: valueFrom,
          targetAmount: valueTo,
        })
      );

      dispatch(Slice.actions.changeValueTo({ valueTo: '', rate }));
      dispatch(Slice.actions.changeValueFrom({ valueFrom: '', rate }));
    });
  };

  const isEqualOrLessThanBalance = (value: string) =>
    value === '' || new BN(value).isLessThanOrEqualTo(activeAccount.balance);
  const rulesFrom: ValidationRule[] = [isEqualOrLessThanBalance];
  const rulesTo: ValidationRule[] = [
    (value) => value === '' || new BN(value).dividedBy(rate).isLessThanOrEqualTo(activeAccount.balance),
  ];

  const disabled =
    (checkRules(rulesFrom, valueFrom) && checkRules(rulesTo, valueTo)) ||
    isEmpty(valueFrom) ||
    isEmpty(valueTo);

  const reversedRate = `${getSymbolFromCurrency(activeAccount.currency)} 1 = ${getSymbolFromCurrency(
    targetAccount.currency
  )} ${rate.toPrecision(4)}`;
  return (
    <S.ExchangePage>
      <Top />
      <S.Wrapper>
        <Controls
          accounts={accounts}
          activeAccount={activeAccount}
          targetAccount={targetAccount}
          rulesFrom={rulesFrom}
          rulesTo={rulesTo}
          valueFrom={valueFrom}
          valueTo={valueTo}
          rate={rate}
          dispatch={dispatch}
        />
        <S.SwitchArrow $disabled={disabled} onClick={handleExchange}>
          <S.StyledIcon icon="arrow-down" />
        </S.SwitchArrow>
      </S.Wrapper>
      <S.ReversedRate>{reversedRate}</S.ReversedRate>

      <S.Actions>
        <Button disabled={disabled} onClick={handleExchange}>
          Exchange
        </Button>
      </S.Actions>
    </S.ExchangePage>
  );
};

export default Exchange;
