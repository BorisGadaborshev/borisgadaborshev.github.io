import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const FeaturesPreview = styled.div`
  position: absolute;
  left: 22px;
  top: 89px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 10px;
  width: 353px;
  height: 291px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 36px;
  opacity: 0.5;
  z-index: 1;
`;

interface HeaderProps {
  menuIcon: string;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
}

export const Header: FC<HeaderProps> = ({
  menuIcon,
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
}) => {
  return (
    <>
      <FlowMenu
        menuIcon={menuIcon}
        currentStep={currentStep}
        onStepSelect={onStepSelect}
        canOpenPrompt={canOpenPrompt}
        canOpenPayment={canOpenPayment}
      />
      <FeaturesPreview />
    </>
  );
};
