import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from 'react-slick';

import Button from 'components/Button';

import AccountInfo from './components/AccountInfo';
import * as S from './Main.styles';
import { actions } from './mainSlice';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
};

const Main = () => {
  const routerHistory = useHistory();
  const ref = useRef<Slider>(null);

  const dispatch = useAppDispatch();
  const { accounts, activeAccount, history } = useAppSelector((state) => state.main);

  console.log({ activeAccount });

  const goToNextSlide = () => ref.current?.slickNext();
  const goToPrevSlide = () => ref.current?.slickPrev();

  const afterChange = useCallback(
    (idx: number) => {
      dispatch(actions.changeActiveAccount({ account: accounts[idx] }));
    },
    [dispatch, accounts]
  );

  return (
    <>
      <S.MainPage>
        <S.MainTitle>Your Accounts</S.MainTitle>
        <S.AccountList>
          <S.ArrowLeft icon="arrow-left" onClick={goToPrevSlide} />
          <S.ArrowRight icon="arrow-right" onClick={goToNextSlide} />
          <Slider {...settings} ref={ref} afterChange={afterChange}>
            {accounts.map((accountInfo) => {
              return <AccountInfo key={accountInfo.account} account={accountInfo} />;
            })}
          </Slider>
        </S.AccountList>
        <S.AccountActions>
          <Button variant="outline" shape="rect" onClick={() => routerHistory.push('/exchange')}>
            Exchange
          </Button>
        </S.AccountActions>

        <S.HistorySection>
          <S.SectionTitle>History</S.SectionTitle>
          {history
            .map((item) => {
              return <S.StyledHistoryItem item={item} />;
            })
            .reverse()}
        </S.HistorySection>
      </S.MainPage>
    </>
  );
};

export default Main;
