import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const svetBronzeTop = `${import.meta.env.BASE_URL}images/svetBronzeTop.png`;
const svetBronzeBottom = `${import.meta.env.BASE_URL}images/svetBronzeBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/image-gen-menu-icon.svg`;
const statusBar = `${import.meta.env.BASE_URL}images/image-gen-statusbar.png`;
const balanceIcon = `${import.meta.env.BASE_URL}images/image-gen-balance-icon.svg`;
const spinnerIcon = `${import.meta.env.BASE_URL}images/image-gen-spinner.svg`;
const loadingArrow = `${import.meta.env.BASE_URL}images/image-gen-loading-arrow.svg`;

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
  left: 95px;
  top: 246px;
  width: 204px;
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
  white-space: pre-line;
`;

const SpinnerWrap = styled.div`
  position: absolute;
  left: 88px;
  top: 317px;
  width: 218px;
  height: 218px;
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.5;
`;

const Spinner = styled.img`
  position: absolute;
  left: 142px;
  top: 371px;
  width: 111px;
  height: 111px;
`;

const Arrow = styled.img`
  position: absolute;
  left: -54px;
  top: 190px;
  width: 212.14px;
  height: 258px;
  pointer-events: none;
`;

interface CreateImageLoadingScreenProps {
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const CreateImageLoadingScreen: FC<CreateImageLoadingScreenProps> = ({
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
}) => {
  return (
    <Root>
      <BackgroundLayer>
        <SvetBronzeTop src={svetBronzeTop} alt="" />
        <SvetBronzeBottom src={svetBronzeBottom} alt="" />
      </BackgroundLayer>
      {/* <StatusBar src={statusBar} alt="" /> */}
      <Arrow src={loadingArrow} alt="" />

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
        <Title>{'Подождите!\nПроисходит чудо!'}</Title>
      </TitleWrap>
      <SpinnerWrap />
      <Spinner src={spinnerIcon} alt="" />
    </Root>
  );
};
