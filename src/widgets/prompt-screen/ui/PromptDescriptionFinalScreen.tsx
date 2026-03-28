import styled from '@emotion/styled';
import { FC } from 'react';

const svetRedTop = `${import.meta.env.BASE_URL}images/svetRedTop.png`;
const svetRedBottom = `${import.meta.env.BASE_URL}images/svetRedBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/idea-final-menu-icon.svg`;
const statusBar = `${import.meta.env.BASE_URL}images/idea-final-statusbar.png`;
const balanceIcon = `${import.meta.env.BASE_URL}images/idea-final-balance-icon.svg`;
const buttonBackground = `${import.meta.env.BASE_URL}images/idea-final-button-bg.svg`;
const sendIcon = `${import.meta.env.BASE_URL}images/idea-final-send-icon.svg`;

const Screen = styled.div`
  position: absolute;
  inset: 0;
  background: #0e1116;
  border-radius: 20px;
  overflow: hidden;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const SvetRedTop = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 393px;
  height: auto;
`;

const SvetRedBottom = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 393px;
  height: auto;
`;

const StatusBar = styled.img`
  position: absolute;
  left: -30px;
  top: -25px;
  width: 453px;
  height: 70px;
  object-fit: fill;
  pointer-events: none;
`;

const MenuIcon = styled.img`
  position: absolute;
  left: 20px;
  top: 54px;
  width: 27px;
  height: 27px;
`;

const BalanceBg = styled.div`
  position: absolute;
  left: 282px;
  top: 51px;
  width: 91px;
  height: 33px;
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.5;
`;

const BalanceIcon = styled.img`
  position: absolute;
  left: 291px;
  top: 52px;
  width: 29px;
  height: 28px;
`;

const BalanceValue = styled.div`
  position: absolute;
  left: 325px;
  top: 55px;
  font-family: 'Viga', sans-serif;
  font-weight: 400;
  font-size: 19px;
  line-height: 1.0526316em;
  color: #ffffff;
`;

const TitleWrap = styled.div`
  position: absolute;
  left: 77px;
  top: 210px;
  width: 238px;
  padding: 10px;
`;

const Title = styled.h2`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.9090909em;
  color: #ffffff;
  text-align: center;
`;

const Divider = styled.div`
  position: absolute;
  left: 18px;
  top: 270px;
  width: 357px;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
`;

const MessagePrimaryWrap = styled.div`
  position: absolute;
  left: 5px;
  top: 267px;
  width: 384px;
  padding: 10px;
`;

const MessageSecondaryWrap = styled.div`
  position: absolute;
  left: 5px;
  top: 409px;
  width: 384px;
  padding: 10px;
`;

const Message = styled.p`
  width: 364px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 0.9375em;
  color: #ffffff;
  text-align: center;
  white-space: pre-line;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  width: 353px;
  height: 57px;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
`;

const ButtonBg = styled.img`
  position: absolute;
  inset: 0;
  width: 353px;
  height: 57px;
`;

const ButtonIcon = styled.img`
  position: absolute;
  left: 35px;
  top: 12px;
  width: 34px;
  height: 34px;
`;

const ButtonLabel = styled.span`
  position: absolute;
  left: 82px;
  top: 21px;
  width: 236px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.6818182em;
  color: #ffffff;
  text-align: center;
`;

interface PromptDescriptionFinalScreenProps {
  onBackToMain: () => void;
}

export const PromptDescriptionFinalScreen: FC<PromptDescriptionFinalScreenProps> = ({
  onBackToMain,
}) => {
  return (
    <Screen>
      <BackgroundLayer>
        <SvetRedTop src={svetRedTop} alt="" />
        <SvetRedBottom src={svetRedBottom} alt="" />
      </BackgroundLayer>
      {/* <StatusBar src={statusBar} alt="" /> */}
      <MenuIcon src={menuIcon} alt="" />

      <BalanceBg />
      <BalanceIcon src={balanceIcon} alt="" />
      <BalanceValue>100</BalanceValue>

      <TitleWrap>
        <Title>Магия уже началась!</Title>
      </TitleWrap>
      <Divider />

      <MessagePrimaryWrap>
        <Message>
          {'Спасибо! Мы получили ваш запрос и уже работаем над созданием видео.\n\nНемного времени — и ваша идея превратится в готовый результат.'}
        </Message>
      </MessagePrimaryWrap>

      <MessageSecondaryWrap>
        <Message>{'Можете закрать миниап,\nготовое видео будет отправлено в чат с батом!'}</Message>
      </MessageSecondaryWrap>

      <BackButton type="button" onClick={onBackToMain}>
        <ButtonBg src={buttonBackground} alt="" />
        <ButtonIcon src={sendIcon} alt="" />
        <ButtonLabel>Вернуться на главную</ButtonLabel>
      </BackButton>
    </Screen>
  );
};
