import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const svetBronzeTop = `${import.meta.env.BASE_URL}images/svetBronzeTop.png`;
const svetBronzeBottom = `${import.meta.env.BASE_URL}images/svetBronzeBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/image-gen-menu-icon.svg`;
const statusBar = `${import.meta.env.BASE_URL}images/image-gen-statusbar.png`;
const balanceIcon = `${import.meta.env.BASE_URL}images/image-gen-balance-icon.svg`;
const buttonBackground = `${import.meta.env.BASE_URL}images/image-gen-result-button-bg.svg`;
const sendIcon = `${import.meta.env.BASE_URL}images/image-gen-send-icon.svg`;

const Root = styled.div`
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

const SvetBronzeTop = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 393px;
  height: auto;
`;

const SvetBronzeBottom = styled.img`
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
  color: #ffffff;
  text-align: center;
`;

const SubtitleWrap = styled.div`
  position: absolute;
  left: 10px;
  top: 228px;
  width: 374px;
  padding: 10px;
`;

const Subtitle = styled.p`
  margin: 0;
  width: 354px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 0.9375em;
  color: #ffffff;
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
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.5;
`;

const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 727px;
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
  color: #ffffff;
  text-align: center;
`;

interface CreateImageResultScreenProps {
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
  onBackToMain: () => void;
}

export const CreateImageResultScreen: FC<CreateImageResultScreenProps> = ({
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
  onBackToMain,
}) => {
  return (
    <Root>
      <BackgroundLayer>
        <SvetBronzeTop src={svetBronzeTop} alt="" />
        <SvetBronzeBottom src={svetBronzeBottom} alt="" />
      </BackgroundLayer>
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
          Твоё изображение создано. Можешь сохранить картинку или попробовать создать
          что-нибудь ещё.
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
