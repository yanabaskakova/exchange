import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useRef } from 'react';
import Slider from 'react-slick';
import { RootState } from 'store';

import Button from 'components/Button';

// import Icon from 'components/Icon';
import AccountInfo from './components/AccountInfo';
import {
  AccountActions,
  AccountList,
  ArrowLeft,
  ArrowRight,
  HistorySection,
  MainPage,
  MainTitle,
  SectionTitle,
} from './Main.styles';
import { actions } from './mainSlice';

const Main = () => {
  const accounts = useAppSelector((state: RootState) => state.main.accounts);
  const activeAccount = useAppSelector((state: RootState) => state.main.activeAccount);
  const dispatch = useAppDispatch();
  console.log({ activeAccount });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (idx: number) => {
      dispatch(actions.changeActiveAccount(accounts[idx]));
    },
  };

  const ref = useRef<Slider>(null);

  const goToNextSlide = () => ref.current?.slickNext();
  const goToPrevSlide = () => ref.current?.slickPrev();

  return (
    <MainPage>
      <MainTitle>Your Accounts</MainTitle>
      <AccountList>
        <ArrowLeft icon="arrow-left" onClick={goToPrevSlide} />
        <ArrowRight icon="arrow-right" onClick={goToNextSlide} />
        <Slider {...settings} ref={ref}>
          {accounts.map((accountInfo) => {
            return <AccountInfo account={accountInfo} />;
          })}
        </Slider>
      </AccountList>
      <AccountActions>
        <Button variant="outline" shape="rect">
          Exchange
        </Button>
      </AccountActions>

      <HistorySection>
        <SectionTitle>History</SectionTitle>
      </HistorySection>
    </MainPage>
  );
};

export default Main;
