import { useAppDispatch, useAppSelector } from 'app/hooks';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useRates } from 'hooks';
import _ from 'lodash';
import { useEffect, useReducer, useRef } from 'react';
import { batch, shallowEqual } from 'react-redux';

import Button from 'components/Button';
import CurrencyInput from 'components/CurrencyInput';
import { isEqualOrLess } from 'components/Input/Input.helpers';
import { Value } from 'components/NumberInput/useNumberInput';
import { Option } from 'components/Select/types';
import { Currency } from 'pages/Main/mainSlice';

import * as MainSlice from '../Main/mainSlice';
import * as S from './Exchange.styles';
import * as Slice from './exchangeSlice';

function isEmpty(value: string) {
  return value === '';
}

const Exchange = () => {
  const inputFromRef = useRef<HTMLInputElement>(null);
  const inputToRef = useRef<HTMLInputElement>(null);
  const appDispatch = useAppDispatch();
  const { accounts, activeAccount } = useAppSelector(
    (state) => ({ accounts: state.main.accounts, activeAccount: state.main.activeAccount }),
    shallowEqual
  );
  const defaultTargetAccount = accounts.filter((account) => account.account !== activeAccount.account)[0];
  const [state, dispatch] = useReducer<typeof Slice.reducer>(Slice.reducer, {
    ...Slice.initialState,
    targetAccount: defaultTargetAccount,
  });

  const { valueFrom, valueTo, targetAccount } = state;

  const currentTargetAccount =
    accounts.find((account) => account.account === targetAccount?.account) || defaultTargetAccount;

  const options = getOptionsFromAccounts(accounts);

  const rates = useRates();
  const rate = rates
    ? rates[currentTargetAccount.currency.toUpperCase()] / rates[activeAccount.currency.toUpperCase()]
    : null;

  const isEqualOrLessThanBalance = (value: string) => isEqualOrLess(value, Number(activeAccount.balance));
  const rulesFrom = [isEqualOrLessThanBalance];
  const rulesTo = [
    (value: string) => isEqualOrLess((Number(value) / (rate || 1)).toString(), Number(activeAccount.balance)),
  ];
  const disabled =
    (rulesFrom.some((rule) => !rule(valueFrom)) && rulesTo.some((rule) => !rule(valueTo))) ||
    isEmpty(valueFrom) ||
    isEmpty(valueTo);

  const handleCurrencyFromChange = (option: Option<Currency>) => {
    const account = accounts.find((account) => account.account === option.id);
    if (!account || !rate) throw new Error('Error');

    batch(() => {
      if (account.account === currentTargetAccount.account) {
        dispatch(Slice.actions.changeTargetAccount({ targetAccount: activeAccount }));
      }
      dispatch(Slice.actions.changeValueTo({ valueTo: '', rate }));
      dispatch(Slice.actions.changeValueFrom({ valueFrom: '', rate }));
      appDispatch(MainSlice.actions.changeActiveAccount({ account }));
    });
  };

  const handleCurrencyToChange = (option: Option<Currency>) => {
    const account = accounts.find((account) => account.account === option.id);
    if (!account || !rate) throw new Error('Error');

    batch(() => {
      if (account.account === activeAccount.account) {
        appDispatch(MainSlice.actions.changeActiveAccount({ account: currentTargetAccount }));
      }
      dispatch(Slice.actions.changeValueTo({ valueTo: '', rate }));
      dispatch(Slice.actions.changeValueFrom({ valueFrom: '', rate }));
      dispatch(Slice.actions.changeTargetAccount({ targetAccount: account }));
    });
  };

  const handleValueFrom = ({ value }: Value) => {
    if (!rate) throw new Error('Error');
    dispatch(Slice.actions.changeValueFrom({ valueFrom: value, rate }));
  };

  const handleValueTo = ({ value }: Value) => {
    if (!rate) throw new Error('Error');

    dispatch(Slice.actions.changeValueTo({ valueTo: value, rate }));
  };

  const handleExchange = () => {
    if (disabled || !rate) return;

    appDispatch(
      MainSlice.actions.exchange({
        sourceAccount: activeAccount,
        targetAccount: currentTargetAccount,
        sourceAmount: valueFrom,
        targetAmount: valueTo,
      })
    );
  };

  useEffect(() => {
    if (!rate) return;
    const activeElement = document.activeElement;

    if (activeElement === inputFromRef.current) {
      dispatch(Slice.actions.changeValueTo({ rate }));
      return;
    }

    if (activeElement === inputToRef.current) {
      dispatch(Slice.actions.changeValueFrom({ rate }));
      return;
    }

    dispatch(Slice.actions.changeValueFrom({ rate }));
    dispatch(Slice.actions.changeValueTo({ rate }));
  }, [rate, rates]);

  if (!rate || !rates) return <span>Loading</span>;

  return (
    <S.ExchangePage>
      <S.Title>Exchange</S.Title>
      <S.Wrapper>
        <CurrencyInput
          ref={inputFromRef}
          rules={rulesFrom}
          placeholder={activeAccount.balance.toLocaleString()}
          value={valueFrom}
          currency={activeAccount.currency}
          options={options}
          onChange={handleValueFrom}
          onCurrencyChange={handleCurrencyFromChange}
          balance={activeAccount.balance.toString()}
        />

        <S.CurrencyInputTo
          ref={inputToRef}
          placeholder={_.round(activeAccount.balance * rate, 2).toLocaleString()}
          value={valueTo}
          rules={rulesTo}
          onChange={handleValueTo}
          options={options}
          onCurrencyChange={handleCurrencyToChange}
          currency={currentTargetAccount.currency}
          balance={currentTargetAccount.balance.toString()}
        />
        <S.SwitchArrow $disabled={disabled} onClick={handleExchange}>
          <S.StyledIcon icon="arrow-down" />
        </S.SwitchArrow>
      </S.Wrapper>
      {rate ? (
        <S.ReversedRate>
          {getSymbolFromCurrency(activeAccount.currency)} 1 ={' '}
          {getSymbolFromCurrency(currentTargetAccount.currency)} {_.round(rate, 4)}
        </S.ReversedRate>
      ) : undefined}

      <S.Actions>
        <Button disabled={disabled} onClick={handleExchange}>
          Exchange
        </Button>
      </S.Actions>
    </S.ExchangePage>
  );
};

export default Exchange;

function getOptionsFromAccounts(accounts: MainSlice.Account[]) {
  return accounts.map((account) => {
    return {
      id: account.account,
      label: account.currency.toUpperCase(),
      value: account.currency,
    };
  });
}
