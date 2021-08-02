import styled, { css } from 'styled-components/macro';

interface StyledDefaultFieldProps {
  $withIcon: boolean;
  $invalid: boolean;
  $valid: boolean;
  $disabled?: boolean;
}

export const StyledDefaultField = styled.div<StyledDefaultFieldProps>`
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  background: #fff;
  /* background: #f8f8f8; */
  border: 1px solid transparent;
  /* border: 1px solid #eeeeee; */
  box-sizing: border-box;
  border-radius: 10px;
  transition: border 0.15s linear;

  input,
  textarea {
    display: block;
    border: none;
    padding: ${(props) => (props.$withIcon ? '10px 40px 10px 16px' : '10px 16px')};
    width: 100%;
    font-size: 14px;
    line-height: 21px;
    color: #4a4a56;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #787878;
    }
  }

  input {
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  ${({ $invalid, theme }) => {
    return (
      $invalid &&
      css`
        border: 1px solid red;
        border-color: red;
      `
    );
  }}
`;

export const StyledIconWrapper = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  right: 15px;
  transform: translate(0, -50%);
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Label = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[50]};
  margin-bottom: 4px;
`;
