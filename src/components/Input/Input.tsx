import _ from 'lodash';
import React, { useMemo, useState } from 'react';

import DefaultField from './components/DefaultField';

export interface InputProps {
  skeleton?: boolean;

  className?: string;

  type?: 'text' | 'number';

  value?: string;
  defaultValue?: string;
  placeholder?: string;
  label?: string;
  disabled?: boolean;

  rules?: ((value: string) => boolean)[];

  Field?: React.FC;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;

  onFocus?: (value: string) => void;
  onBlur?: (value: string) => void;
  onChange?: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  skeleton = false,

  className,

  type = 'text',
  defaultValue = '',
  placeholder,
  label,
  value,

  rules = [],

  disabled = false,

  Field = DefaultField,
  endAdornment: EndAdornment,
  startAdornment: StartAdornment,

  onFocus,
  onBlur,
  onChange,
}) => {
  const isControlled = !_.isUndefined(value);

  const [valueState, setValueState] = useState(defaultValue);
  const currentValue = isControlled ? value : valueState;

  const handleValidate = (value: string) => {
    if (!rules.length) return;
  };

  const valid = useMemo(
    () => (currentValue ? rules.every((rule) => rule(currentValue)) : null),
    [currentValue, rules]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newValue = e.target.value;

    handleValidate(newValue);
    !isControlled && setValueState(newValue);
    onChange?.(newValue);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    onFocus?.(e.target.value);
  };

  const hadleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur?.(e.target.value);
  };

  return (
    <Field className={className} valid={valid} disabled={disabled} label={label}>
      {StartAdornment}
      <input
        type={type}
        value={currentValue}
        disabled={disabled}
        placeholder={placeholder}
        onBlur={hadleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
      />
      {EndAdornment}
    </Field>
  );
};

export default Input;
