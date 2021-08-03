import React, { useEffect, useState } from 'react';

export type Value = {
  value: string;
  formattedValue: string;
  valid: null | boolean;
};

type State = {
  value: string;
  formattedValue: string;
};

type Options = {
  maxLength?: number;
  allowedStartSymbols?: string[];
  defaultValue?: string;

  decimalSeparator?: string;
  decimalScale?: number;

  rules?: ((value: string) => boolean)[];
  canEnterNonValidValue?: boolean;

  onChange?: ({ value, formattedValue, valid }: Value) => void;
};

export const useNumberInput = (options: Options) => {
  const {
    maxLength = 50,
    allowedStartSymbols = ['-'],
    defaultValue = '',

    decimalSeparator = '.',
    decimalScale = 2,

    canEnterNonValidValue = true,
    rules,

    onChange,
  }: Options = options;

  const [state, setState] = useState<State>(() => {
    return initState(defaultValue, decimalSeparator, decimalScale);
  });
  const [valid, setValid] = useState<null | boolean>(null);

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > maxLength) return;
    if (new RegExp(`\\..{${decimalScale + 1},${decimalScale + 1}}$`).test(e.target.value)) return;

    const symbol =
      allowedStartSymbols.length && allowedStartSymbols.includes(e.target.value[0]) ? e.target.value[0] : '';

    const val = e.target.value.replace(new RegExp(`^\\${decimalSeparator}`), '').replace(/^-/, '');
    const { integer, decimal } = splitOnIntegerAndDecimal(val, decimalSeparator, decimalScale);
    const potentialValue = `${symbol}${integer}${decimal}`;

    if (state.value === potentialValue) return;

    const valid = rules ? rules.every((rule) => rule(potentialValue)) : true;

    setValid(valid);
    if (valid || canEnterNonValidValue) {
      const formattedValue = `${symbol}${format(integer, decimal)}`;
      const newState = { value: potentialValue, formattedValue, valid };

      onChange && onChange(newState);
      setState(newState);
    }
  };

  useEffect(() => {
    setState(initState(defaultValue, decimalSeparator, decimalScale));
  }, [defaultValue, decimalSeparator, decimalScale]);

  return { valid, ...state, onChange: onChangeValue };
};

export const format = (integer: string, decimal: string) => {
  if (!integer) return '';
  return `${BigInt(integer).toLocaleString()}${decimal}`;
};

export const splitOnIntegerAndDecimal = (value: string, decimalSeparator: string, decimalScale: number) => {
  const pos = value.lastIndexOf(decimalSeparator);
  const integerSlice = pos === -1 ? value : value.slice(0, pos);
  const decimalSlice = pos === -1 ? null : `${decimalSeparator}${value.slice(pos + 1)}`;

  const integer = integerSlice.replace(/\D/g, '').replace(/^0+\d/, '0');
  const decimal =
    decimalSlice === null ? '' : decimalSeparator + decimalSlice.replace(/\D/g, '').slice(0, decimalScale);

  return { integer, decimal, pos };
};

const initState = (defaultValue: string, decimalSeparator: string, decimalScale: number): State => {
  const { integer, decimal } = splitOnIntegerAndDecimal(defaultValue, decimalSeparator, decimalScale);

  return {
    value: defaultValue,
    formattedValue: format(integer, decimal),
  };
};
