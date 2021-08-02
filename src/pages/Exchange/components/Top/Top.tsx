import React from 'react';
import { useHistory } from 'react-router';

import * as S from './Top.styled';

const Top: React.FC = () => {
  const history = useHistory();

  return (
    <S.Header>
      <S.HeaderArrow icon="arrow-left" onClick={() => history.push('/')} />
      <S.Title>Exchange</S.Title>
    </S.Header>
  );
};

export default Top;
