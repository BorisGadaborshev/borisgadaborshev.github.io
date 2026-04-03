import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const FeaturesPreview = styled.div`
  position: absolute;
  left: 22px;
  top: 89px;
  padding: 0;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  gap: 0;
  width: 353px;
  height: 291px;
  background: #000;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 36px;
  opacity: 1;
  z-index: 8;
`;

const PreviewVideo = styled.video`
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 36px;
  z-index: 9;
`;

interface HeaderProps {
  menuIcon: string;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const Header: FC<HeaderProps> = ({
  menuIcon,
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
}) => {
  const previewVideo = `${import.meta.env.BASE_URL}images/1000186690.mp4`;

  return (
    <>
      <FlowMenu
        menuIcon={menuIcon}
        currentStep={currentStep}
        onStepSelect={onStepSelect}
        canOpenPrompt={canOpenPrompt}
        canOpenPayment={canOpenPayment}
        canOpenQuality={canOpenQuality}
      />
      <FeaturesPreview>
        <PreviewVideo autoPlay muted loop playsInline preload="auto">
          <source src={previewVideo} type="video/mp4" />
        </PreviewVideo>
      </FeaturesPreview>
    </>
  );
};
