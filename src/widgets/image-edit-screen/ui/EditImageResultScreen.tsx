import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const svetGreenTop = `${import.meta.env.BASE_URL}images/svetGreenTop.png`;
const svetGreenBottom = `${import.meta.env.BASE_URL}images/svetGreenBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/edit-gen-menu-icon.svg`;
const statusBar = `${import.meta.env.BASE_URL}images/edit-gen-statusbar.png`;
const balanceIcon = `${import.meta.env.BASE_URL}images/edit-gen-balance-icon.svg`;
const buttonBackground = `${import.meta.env.BASE_URL}images/edit-gen-result-button-bg.svg`;
const sendIcon = `${import.meta.env.BASE_URL}images/edit-gen-send-icon.svg`;

const Root = styled.div`
  position: absolute;
  inset: 0;
  background: #0e1116;
  border-radius: 20px;
  overflow: hidden;
`;
const BgLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;
const Top = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 393px;
`;
const Bottom = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 393px;
`;
const StatusBar = styled.img`
  position: absolute;
  left: -30px;
  top: -25px;
  width: 453px;
  height: 70px;
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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
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
  font-size: 19px;
  color: #fff;
`;
const TitleWrap = styled.div`
  position: absolute;
  left: 91px;
  top: 186px;
  width: 211px;
  padding: 10px;
`;
const Title = styled.h2`
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.9090909em;
  color: #fff;
  text-align: center;
`;
const SubtitleWrap = styled.div`
  position: absolute;
  left: 23px;
  top: 228px;
  width: 348px;
  padding: 10px;
`;
const Subtitle = styled.p`
  margin: 0;
  width: 328px;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 0.9375em;
  color: #fff;
  text-align: center;
`;
const ResultBox = styled.div`
  position: absolute;
  left: 20px;
  top: 338px;
  width: 353px;
  height: 289px;
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.5;
`;
const BackButton = styled.button`
  position: absolute;
  left: 20px;
  bottom: calc(20px + env(safe-area-inset-bottom, 0px));
  width: 353px;
  height: 57px;
  border: 0;
  padding: 0;
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
  color: #fff;
  text-align: center;
`;

interface EditImageResultScreenProps {
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
  onBackToMain: () => void;
}

export const EditImageResultScreen: FC<EditImageResultScreenProps> = ({
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
  onBackToMain,
}) => {
  return (
    <Root>
      <BgLayer>
        <Top src={svetGreenTop} alt="" />
        <Bottom src={svetGreenBottom} alt="" />
      </BgLayer>
      {/* <StatusBar src={statusBar} alt="" /> */}
      <FlowMenu
        menuIcon={menuIcon}
        currentStep={currentStep}
        onStepSelect={onStepSelect}
        canOpenPrompt={canOpenPrompt}
        canOpenPayment={canOpenPayment}
        canOpenQuality={canOpenQuality}
      />
      <BalanceBg />
      <BalanceIcon src={balanceIcon} alt="" />
      <BalanceValue>100</BalanceValue>
      <TitleWrap>
        <Title>Магия завершена!</Title>
      </TitleWrap>
      <SubtitleWrap>
        <Subtitle>
          Если у вас есть ещё снимки, которые вы хотите поправить, мы будем рады помочь с этим!
        </Subtitle>
      </SubtitleWrap>
      <ResultBox />
      <BackButton type="button" onClick={onBackToMain}>
        <ButtonBg src={buttonBackground} alt="" />
        <ButtonIcon src={sendIcon} alt="" />
        <ButtonLabel>Вернуться на главную</ButtonLabel>
      </BackButton>
    </Root>
  );
};
