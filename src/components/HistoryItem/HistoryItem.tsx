import getSymbolFromCurrency from 'currency-symbol-map';
import React from 'react';

import { HistoryItem as HistoryItemType } from 'pages/Main/mainSlice';

import * as S from './HistoryItem.styled';

interface Props {
  className?: string;
  item: HistoryItemType;
}

const HistoryItem: React.FC<Props> = ({ className, item }) => {
  return (
    <S.Wrapper className={className}>
      <S.StyledIcon icon="exchange" />
      <S.Title>
        Exchange from {item.sourceAccount.currency.toUpperCase()} to{' '}
        {item.targetAccount.currency.toUpperCase()}
      </S.Title>
      <S.Amount>
        <S.SourceAmount>
          {/* Don't use toFixed in real projects */}
          {/* https://stackoverflow.com/questions/10015027/javascript-tofixed-not-rounding */}-{' '}
          {Number(item.sourceAmount).toFixed(2)} {getSymbolFromCurrency(item.sourceAccount.currency)}
        </S.SourceAmount>
        <S.TargetAmount>
          + {Number(item.targetAmount).toFixed(2)} {getSymbolFromCurrency(item.targetAccount.currency)}
        </S.TargetAmount>
      </S.Amount>
    </S.Wrapper>
  );
};

export default HistoryItem;
