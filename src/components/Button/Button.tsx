import React, { FC } from 'react';
import Loader from 'react-loader-spinner';

import { LoadingButton, StyledButton } from './Button.styles';
import { ButtonKind, ButtonShape, ButtonVariant } from './types';

interface Props {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  shape?: ButtonShape;
  type?: 'button' | 'submit' | 'reset';
  kind?: ButtonKind;
  variant?: ButtonVariant;
  ref?: any;
  onClick?: () => void;
}

const Button: FC<Props> = React.forwardRef(
  (
    {
      className,
      loading = false,
      disabled = false,
      shape = 'round',
      type = 'button',
      kind = 'primary',
      variant = 'primary',
      children,

      onClick,
    },
    ref
  ) => {
    return (
      <StyledButton
        className={className}
        ref={ref as any}
        disabled={disabled || loading}
        shape={shape}
        type={type}
        kind={kind}
        variant={variant}
        onClick={onClick}
      >
        {loading && (
          <LoadingButton kind={kind}>
            <Loader type="TailSpin" color="#3273f0" height={43} width={40} />
          </LoadingButton>
        )}

        {children}
      </StyledButton>
    );
  }
);

export default Button;
