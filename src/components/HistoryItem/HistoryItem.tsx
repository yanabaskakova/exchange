import getSymbolFromCurrency from 'currency-symbol-map';
import useBigNumber from 'hooks/useBigNumber';
import React from 'react';

import { HistoryItem as HistoryItemType } from 'pages/Main/types';

import * as S from './HistoryItem.styled';

interface Props {
  className?: string;
  item: HistoryItemType;
}

const HistoryItem: React.FC<Props> = ({ className, item }) => {
  const BN = useBigNumber();
  const sourceAmount = new BN(item.sourceAmount).decimalPlaces(2).toFormat();
  const targetAmount = new BN(item.targetAmount).decimalPlaces(2).toFormat();
  return (
    <S.Wrapper className={className}>
      <S.StyledIcon icon="exchange" />
      <S.Title>
        Exchange from {item.sourceAccount.currency.toUpperCase()} to{' '}
        {item.targetAccount.currency.toUpperCase()}
      </S.Title>
      <S.Amount>
        <S.SourceAmount>
          - {sourceAmount} {getSymbolFromCurrency(item.sourceAccount.currency)}
        </S.SourceAmount>
        <S.TargetAmount>
          + {targetAmount} {getSymbolFromCurrency(item.targetAccount.currency)}
        </S.TargetAmount>
      </S.Amount>
    </S.Wrapper>
  );
};

export default HistoryItem;
