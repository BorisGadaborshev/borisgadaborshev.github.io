import { FC } from 'react';
import styled from '@emotion/styled';

const BG_TOP = `${import.meta.env.BASE_URL}images/svetPurpleTop.png`;
const BG_BOTTOM = `${import.meta.env.BASE_URL}images/sverPurpleBottom.png`;
const BG_BOTTOM_FALLBACK = `${import.meta.env.BASE_URL}images/svetPurpleBottom.png`;
const STATUS_BAR = `${import.meta.env.BASE_URL}images/main-statusbar.png`;
const MENU_ICON = `${import.meta.env.BASE_URL}images/main-menu-icon.svg`;
const BALANCE_ICON = `${import.meta.env.BASE_URL}images/main-balance-icon.svg`;

const Root = styled.div`
  position: absolute;
  inset: 0;
  background: #090b16;
  border-radius: 20px;
  overflow: hidden;
`;

const TopLight = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  width: 390px;
  transform: translateX(-50%);
  pointer-events: none;
`;

const BottomLight = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 390px;
  transform: translateX(-50%);
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  min-height: 100%;
  padding: 12px 20px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatusBar = styled.img`
  width: 100%;
  margin-top: 2px;
`;

const Header = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  background: transparent;
  padding: 0;
`;

const MenuIcon = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  padding: 0 12px;
  color: #f9f9ff;
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
`;

const BalanceIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const DecorLineTop = styled.div`
  position: absolute;
  left: -74px;
  top: 190px;
  width: 188px;
  height: 188px;
  border: 1px solid rgba(255, 255, 255, 0.36);
  border-right: none;
  border-bottom: none;
  border-radius: 50%;
  transform: rotate(-28deg);
`;

const DecorLineBottom = styled.div`
  position: absolute;
  left: -96px;
  top: 338px;
  width: 206px;
  height: 206px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-left: none;
  border-top: none;
  border-radius: 50%;
  transform: rotate(14deg);
`;

const Title = styled.h2`
  margin: 110px 0 0;
  color: #ffffff;
  text-align: center;
  font-size: 34px;
  line-height: 0.95;
  font-weight: 600;
`;

const Subtitle = styled.p`
  margin: 4px 0 0;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 16px;
  line-height: 1.1;
  font-weight: 500;
`;

const SpinnerCard = styled.div`
  margin-top: 58px;
  width: 182px;
  height: 182px;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(47, 48, 84, 0.36);
  backdrop-filter: blur(14px);
  display: grid;
  place-items: center;
  box-shadow: inset 0 0 36px rgba(255, 255, 255, 0.03);
`;

const Spinner = styled.div`
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: conic-gradient(#b94ee8 0deg 292deg, rgba(255, 255, 255, 0.17) 292deg 360deg);
  animation: spin 1.1s linear infinite;

  &::after {
    content: '';
    display: block;
    width: 64px;
    height: 64px;
    margin: 11px;
    border-radius: 50%;
    background: #23254b;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export const EnhanceImageLoadingScreen: FC = () => (
  <Root>
    <TopLight src={BG_TOP} alt="" />
    <BottomLight
      src={BG_BOTTOM}
      alt=""
      onError={(event) => {
        event.currentTarget.src = BG_BOTTOM_FALLBACK;
      }}
    />
    <Content>
      {/* <StatusBar src={STATUS_BAR} alt="" /> */}
      <Header>
        <MenuButton type="button" aria-label="menu">
          <MenuIcon src={MENU_ICON} alt="" />
        </MenuButton>
        <Balance>
          <BalanceIcon src={BALANCE_ICON} alt="" />
          <span>200</span>
        </Balance>
      </Header>
      <DecorLineTop />
      <DecorLineBottom />
      <Title>Улучшаем качество</Title>
      <Subtitle>Происходит чудо!</Subtitle>
      <SpinnerCard>
        <Spinner />
      </SpinnerCard>
    </Content>
  </Root>
);
