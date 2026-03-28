import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';
import { Background } from './Background';

const menuIcon = `${import.meta.env.BASE_URL}images/menu-icon.svg`;
const balanceIcon = `${import.meta.env.BASE_URL}images/main-balance-icon.svg`;
const spinnerIcon = `${import.meta.env.BASE_URL}images/image-gen-spinner.svg`;

interface MainUploadLoadingScreenProps {
  label?: string;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

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

const SpinnerWrap = styled.div`
  position: absolute;
  left: 88px;
  top: 305px;
  width: 218px;
  height: 218px;
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.5;
`;

const Spinner = styled.div`
  position: absolute;
  left: 142px;
  top: 359px;
  width: 111px;
  height: 111px;
  background: #3e9aee;
  -webkit-mask: url(${spinnerIcon}) center / contain no-repeat;
  mask: url(${spinnerIcon}) center / contain no-repeat;
  animation: spin 1.1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  position: absolute;
  left: 72px;
  top: 244px;
  width: 250px;
  text-align: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 1;
`;

export const MainUploadLoadingScreen: FC<MainUploadLoadingScreenProps> = ({
  label = 'Загружаем изображение...',
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
}) => (
  <>
    <Background />
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
    <LoadingText>{label}</LoadingText>
    <SpinnerWrap />
    <Spinner />
  </>
);
