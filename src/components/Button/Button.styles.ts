import styled, { css } from 'styled-components';

import { ButtonKind, ButtonShape, ButtonVariant } from './types';

const btnKindCss = css<{ kind: ButtonKind; variant: ButtonVariant }>`
  ${({ variant }) => {
    if (variant === 'primary') {
      return `
      background-color: #3273f0;
      color: #fff;
    
      &:hover {
        background-color: #2463DB;
      }
  
      &:disabled {
        background-color: #3E7AEF;
      }
      `;
    }

    if (variant === 'outline') {
      return `
      background-color: transparent;
      border: 1px solid #3273f0;
      color: #3273f0;
    
      &:hover {
        background-color: #E1EBFE;
        color: #3273f0;
      }
  
      &:disabled {
        background-color: #6899F9;
      }
      `;
    }
  }}
`;

export const StyledButton = styled.button<{ shape: ButtonShape; kind: ButtonKind; variant: ButtonVariant }>`
  position: relative;
  overflow: hidden;
  border: none;
  transition: background-color 0.15s linear, color 0.15s linear;
  outline: none;
  height: 36px;
  padding: 0 40px;
  cursor: pointer;
  font-size: 14px;
  font-family: 'Poppins';
  font-weight: 600;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  border-radius: ${({ shape }) => {
    switch (shape) {
      case 'rect':
        return '5px';
      case 'round':
      default:
        return '50px';
    }
  }};

  ${btnKindCss};
`;

interface LoadingButtonProps {
  kind: ButtonKind;
}

export const LoadingButton = styled.div<LoadingButtonProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #3273f0;
`;
