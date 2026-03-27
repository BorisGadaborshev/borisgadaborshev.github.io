import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const svetGreenTop = `${import.meta.env.BASE_URL}images/svetGreenTop.png`;
const svetGreenBottom = `${import.meta.env.BASE_URL}images/svetGreenBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/edit-gen-menu-icon.svg`;
const statusBar = `${import.meta.env.BASE_URL}images/edit-gen-statusbar.png`;
const balanceIcon = `${import.meta.env.BASE_URL}images/edit-gen-balance-icon.svg`;
const spinnerIcon = `${import.meta.env.BASE_URL}images/edit-gen-spinner.svg`;

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
  color: #fff;
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
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.5;
`;
const Spinner = styled.img`
  position: absolute;
  left: 142px;
  top: 371px;
  width: 111px;
  height: 111px;
`;

interface EditImageLoadingScreenProps {
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const EditImageLoadingScreen: FC<EditImageLoadingScreenProps> = ({
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
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
        <Title>{'Подождите!\nПроисходит чудо!'}</Title>
      </TitleWrap>
      <SpinnerWrap />
      <Spinner src={spinnerIcon} alt="" />
    </Root>
  );
};
