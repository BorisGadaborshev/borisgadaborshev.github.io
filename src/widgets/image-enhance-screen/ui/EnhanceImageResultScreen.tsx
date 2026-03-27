import { FC } from 'react';
import styled from '@emotion/styled';

const BG_TOP = `${import.meta.env.BASE_URL}images/svetPurpleTop.png`;
const BG_BOTTOM = `${import.meta.env.BASE_URL}images/sverPurpleBottom.png`;
const BG_BOTTOM_FALLBACK = `${import.meta.env.BASE_URL}images/svetPurpleBottom.png`;
const STATUS_BAR = `${import.meta.env.BASE_URL}images/main-statusbar.png`;
const MENU_ICON = `${import.meta.env.BASE_URL}images/main-menu-icon.svg`;
const BALANCE_ICON = `${import.meta.env.BASE_URL}images/main-balance-icon.svg`;
const BUTTON_BG = `${import.meta.env.BASE_URL}images/video-final-button-bg.svg`;

interface EnhanceImageResultScreenProps {
  onBackToMain: () => void;
}

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
  padding: 12px 20px 28px;
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

const Title = styled.h2`
  margin: 100px 0 8px;
  color: #fff;
  text-align: center;
  font-size: 34px;
  line-height: 0.95;
  font-weight: 600;
`;

const Subtitle = styled.p`
  margin: 8px 0 0;
  max-width: 330px;
  color: rgba(255, 255, 255, 0.88);
  text-align: center;
  font-size: 13px;
  line-height: 1.15;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.45);
`;

const ResultBlock = styled.div`
  width: 100%;
  max-width: 330px;
  height: 230px;
  margin-top: 24px;
  border-radius: 34px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(35, 38, 75, 0.54);
  box-shadow: inset 0 0 36px rgba(255, 255, 255, 0.02);
`;

const BackButtonText = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

const Arrow = styled.span`
  display: inline-block;
  font-size: 28px;
  line-height: 1;
  transform: translateY(-1px);
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const BackButton = styled.button`
  margin-top: auto;
  width: 100%;
  max-width: 330px;
  min-height: 52px;
  border: none;
  background: url(${BUTTON_BG}) center / 100% 100% no-repeat;
  color: #fff;
  padding: 0 20px;
`;

export const EnhanceImageResultScreen: FC<EnhanceImageResultScreenProps> = ({ onBackToMain }) => (
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
      <Title>Магия завершена!</Title>
      <Divider />
      <Subtitle>
        Мы улучшили качество изображения. Если у вас ещё есть изображения в плохом качестве -
        загружайте, мы его улучшим!
      </Subtitle>
      <ResultBlock />
      <BackButton type="button" onClick={onBackToMain}>
        <BackButtonText>
          <Arrow>←</Arrow>
          <Label>Вернуться на главную</Label>
        </BackButtonText>
      </BackButton>
    </Content>
  </Root>
);
