import styled from 'styled-components';

import Icon from 'components/Icon';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledIcon = styled(Icon)`
  display: inline-flex;
  margin-right: 14px;
`;

export const Title = styled.span`
  display: inline-flex;
  font-size: 14px;
  line-height: 14px;
  color: #000000;
`;

export const Amount = styled.div`
  margin-left: auto;
  display: inline-flex;
  flex-direction: column;
`;

export const SourceAmount = styled.span`
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;

export const TargetAmount = styled.span`
  display: block;
  font-size: 12px;
  line-height: 18px;
  color: #a0a0a0;
`;
