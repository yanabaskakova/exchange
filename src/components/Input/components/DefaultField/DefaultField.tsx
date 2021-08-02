import React from 'react';

import { FieldProps } from 'components/Input/types';

import { Label, StyledDefaultField, StyledIconWrapper } from './DefaultField.styles';

const DefaultField: React.FC<FieldProps> = ({ className, children, valid, disabled, icon, label }) => {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <StyledDefaultField
        className={className}
        $withIcon={Boolean(icon)}
        $disabled={disabled}
        $invalid={valid === false}
        $valid={valid === true}
      >
        {icon && <StyledIconWrapper>{icon}</StyledIconWrapper>}

        {children}
      </StyledDefaultField>
    </div>
  );
};

export default DefaultField;
