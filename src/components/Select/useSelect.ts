import { useState } from 'react';

import { HookOptions, Option as OptionType } from './types';

export const useSelect = <Value extends unknown = string | number>(hookOptions: HookOptions<Value>) => {
  const {
    selectedOptions,
    defaultSelectedOptions = [],

    isMulti = false,

    defaultOpen = false,
    disabled = false,

    rules = [],

    onChange,
  } = hookOptions;

  const [selectedOptionsState, setSelectedOptionsState] = useState<OptionType<Value>[]>(
    selectedOptions || defaultSelectedOptions
  );

  const [valid, setValid] = useState<null | boolean>(null);
  const [open, setOpen] = useState(defaultOpen);

  const onToggleOpen = () => {
    if (disabled) return;
    setOpen(!open);
  };

  const onOptionClick = (option: OptionType<Value>) => {
    if (disabled) return;
    !isMulti && setOpen(false);

    if (selectedOptions) {
      onChange(option);
      return;
    }

    setOptions(option);
    onChange(option);
  };

  const setOptions = (option: OptionType<Value>) => {
    const valid = rules.length ? rules.every((rule) => rule(option)) : null;
    setValid(valid);

    if (!isMulti) {
      setSelectedOptionsState([option]);
      return;
    }

    const isSelected = selectedOptionsState.find((selectedOption) => selectedOption.id === option.id);
    const newSelectedOptions = isSelected
      ? selectedOptionsState.filter((selectedOption) => selectedOption.id !== option.id)
      : [...selectedOptionsState, option];

    setSelectedOptionsState(newSelectedOptions);
  };

  return { selectedOptionsState, open, valid, onToggleOpen, onOptionClick };
};
