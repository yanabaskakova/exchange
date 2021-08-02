import { AnyAction } from '@reduxjs/toolkit';
import useBigNumber from 'hooks/useBigNumber';
import React, { useEffect, useRef } from 'react';
import { batch } from 'react-redux';
import { useAppDispatch } from 'store';

import CurrencyInput from 'components/CurrencyInput';
import { Value } from 'components/NumberInput/useNumberInput';
import { Option } from 'components/Select/types';
import { getOptionsFromAccounts } from 'pages/Exchange/Exchange.helpers';
import { ValidationRule } from 'pages/Exchange/types';
import * as MainSlice from 'pages/Main/mainSlice';
import { Account, Currency } from 'pages/Main/types';

import * as Slice from '../../exchangeSlice';
import * as S from './Controls.styled';

interface Props {
  accounts: Account[];
  activeAccount: Account;
  targetAccount: Account;

  rulesFrom: ValidationRule[];
  rulesTo: ValidationRule[];

  valueFrom: string;
  valueTo: string;

  rate: number;

  dispatch: React.Dispatch<AnyAction>;
}

const Controls: React.FC<Props> = ({
  accounts,
  activeAccount,
  targetAccount,

  rulesFrom,
  rulesTo,

  valueFrom,
  valueTo,

  rate,

  dispatch,
}) => {
  const inputFromRef = useRef<HTMLInputElement>(null);
  const inputToRef = useRef<HTMLInputElement>(null);

  const appDispatch = useAppDispatch();
  const BN = useBigNumber();

  const handleCurrencyFromChange = (option: Option<Currency>) => {
    const account = accounts.find((account) => account.account === option.id);
    if (!account || !rate) throw new Error('Error');

    batch(() => {
      if (account.account === targetAccount.account) {
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
        appDispatch(MainSlice.actions.changeActiveAccount({ account: targetAccount }));
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

  useEffect(() => {
    if (!rate) return;
    const activeElement = document.activeElement;

    batch(() => {
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
    });
  }, [rate, dispatch]);

  const options = getOptionsFromAccounts(accounts);
  const bnSourceBalance = new BN(activeAccount.balance);
  const bnTargetBalance = new BN(targetAccount.balance);

  return (
    <>
      <CurrencyInput
        ref={inputFromRef}
        rules={rulesFrom}
        placeholder={bnSourceBalance.decimalPlaces(2).toFormat()}
        value={valueFrom}
        currency={activeAccount.currency}
        options={options}
        onChange={handleValueFrom}
        onCurrencyChange={handleCurrencyFromChange}
        balance={bnSourceBalance.decimalPlaces(2).toFormat()}
        prefix="from"
      />

      <S.CurrencyInputTo
        ref={inputToRef}
        placeholder={bnSourceBalance.multipliedBy(rate).decimalPlaces(2).toFormat()}
        value={valueTo}
        rules={rulesTo}
        onChange={handleValueTo}
        options={options}
        onCurrencyChange={handleCurrencyToChange}
        currency={targetAccount.currency}
        balance={bnTargetBalance.decimalPlaces(2).toFormat()}
        prefix="to"
      />
    </>
  );
};

export default Controls;
