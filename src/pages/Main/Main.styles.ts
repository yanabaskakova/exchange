import styled, { css } from 'styled-components';

import Icon from 'components/Icon';

export const MainPage = styled.div``;

export const AccountList = styled.div`
  background-color: #fff;
  padding: 10px 0 40px 0;
  border-radius: 10px;
  position: relative;
`;

const arrowCss = css`
  position: absolute;
  user-select: none;
  top: 50%;
  z-index: 1;
  cursor: pointer;
  transform: translateY(-50%);
  padding: 6px;

  path {
    transition: fill 0.15s linear;
    fill: #bbb;
  }

  &:hover {
    path {
      fill: #3273f0;
    }
  }
`;

export const ArrowRight = styled(Icon)`
  ${arrowCss}
  right: 4px;
`;

export const ArrowLeft = styled(Icon)`
  ${arrowCss}
  left: 4px;
`;

export const MainTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #222;
  margin-bottom: 20px;
`;

export const AccountActions = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SectionTitle = styled.h4`
  font-size: 16px;
  color: #222;
  text-align: center;
`;

export const HistorySection = styled.div`
  margin-top: 30px;
`;
