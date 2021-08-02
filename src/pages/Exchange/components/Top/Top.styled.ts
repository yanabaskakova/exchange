import styled from 'styled-components';

import Icon from 'components/Icon';

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

export const HeaderArrow = styled(Icon)`
  display: inline-flex;
  cursor: pointer;
  svg {
    width: 16px;
    height: 16px;
    fill: #bbb;
  }
`;

export const Title = styled.h1`
  margin: 0 auto;
  display: inline-flex;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #222222;
`;
