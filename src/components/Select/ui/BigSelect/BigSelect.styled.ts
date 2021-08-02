import styled, { css } from 'styled-components/macro';

import Icon, { IconProps } from 'components/Icon';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

export const Label = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 26px;
  line-height: 1.1;
  background-color: #fafafa;
  &:hover {
    background-color: #e4ebfd;
  }
`;

type CaretProps = {
  $active?: boolean;
} & IconProps;
export const Caret = styled(Icon)<CaretProps>`
  margin-left: 10px;
  display: inline-flex;
  svg {
    fill: ${(props) => (props.$active ? '#4576D6' : '#222222')};
    width: 10px;
    height: 10px;
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  z-index: 1;
  top: calc(100% + 4px);
  display: inline-flex;
  padding: 6px 0px;
  left: 0;
  width: auto;
  min-width: 100%;
  flex-direction: column;
  background: #ffffff;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
`;

export const Option = styled.li<{ $selected?: boolean }>`
  display: flex;
  cursor: pointer;
  user-select: none;
  cursor: pointer;
  padding: 10px 14px;
  transition: background-color 0.1s linear;
  color: #222222;
  ${(props) =>
    props.$selected &&
    css`
      pointer-events: none;
      color: #cfcfcf;
    `}
  &:hover {
    background-color: ${(props) => (props.$selected ? '#ffffff' : '#e4ebfd')};
  }
`;
