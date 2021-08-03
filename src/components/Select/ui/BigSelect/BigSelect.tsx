import { useClickOutside } from 'hooks';
import React from 'react';

import { SelectProps } from 'components/Select/types';
import { useSelect } from 'components/Select/useSelect';

import * as S from './BigSelect.styled';

const BigSelect = <Value extends unknown = string | number>({
  selectedOptions,
  options,
  onChange,
  defaultSelectedOptions,
}: SelectProps<Value>) => {
  const { onOptionClick, onToggleOpen, open, selectedOptionsState } = useSelect({
    onChange,
    selectedOptions,
    defaultSelectedOptions,
  });
  const ref = useClickOutside<HTMLDivElement>(() => open && onToggleOpen());

  const currentSelectedOptions = selectedOptions || selectedOptionsState;

  return (
    <S.Wrapper ref={ref}>
      <S.Label onClick={onToggleOpen}>
        {currentSelectedOptions.map((option) => option.label)}
        <S.Caret $active={open} icon="arrow-down" />
      </S.Label>

      {open && (
        <S.Dropdown data-testid="dropdown-list">
          {options.map((option) => {
            const selected = currentSelectedOptions.find((opt) => opt.id === option.id);
            return (
              <S.Option $selected={Boolean(selected)} key={option.id} onClick={() => onOptionClick(option)}>
                {option.label}
              </S.Option>
            );
          })}
        </S.Dropdown>
      )}
    </S.Wrapper>
  );
};

export default BigSelect;
