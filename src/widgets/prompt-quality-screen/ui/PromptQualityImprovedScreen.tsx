import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const menuIcon = `${import.meta.env.BASE_URL}images/menu-icon.svg`;
const promptInputBackground = `${import.meta.env.BASE_URL}images/prompt-input-bg.svg`;
const rectangle11Background = `${import.meta.env.BASE_URL}images/Rectangle11.png`;
const HIDE_MENU = import.meta.env.VITE_APP_MODE === 'prompt-check';

const ScreenRoot = styled.div`
  position: absolute;
  inset: 0;
  background: #06071a;
`;

const HeaderTitle = styled.h2`
  position: absolute;
  left: 56px;
  top: 128px;
  width: 281px;
  margin: 0;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.1153846153846154em;
  color: #fdfdfd;
  text-align: center;
  white-space: pre-line;
`;

const Divider = styled.div`
  position: absolute;
  left: 8px;
  top: 195px;
  width: 376px;
  height: 1px;
  background: linear-gradient(90deg, #06071a 0%, #d3dcfc 49%, #06071a 100%);
`;

const Subtitle = styled.p`
  position: absolute;
  left: 24px;
  top: 200px;
  width: 344px;
  margin: 0;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 350;
  font-size: 16px;
  line-height: 1.25em;
  color: #c7c7c7;
  text-align: center;
  white-space: pre-line;
`;

const PromptArea = styled.div`
  position: absolute;
  left: 9px;
  top: 228px;
  width: 376px;
  height: 321.87px;
`;

const PromptAreaBackground = styled.img`
  position: absolute;
  left: -120px;
  top: -90px;
  object-fit: fill;
  pointer-events: none;
`;

const PromptContent = styled.div`
  position: absolute;
  left: 15px;
  top: 87px;
  width: 325px;
  height: 177px;
  padding: 14px 16px;
  overflow: auto;
  margin: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 350;
  font-size: 16px;
  line-height: 1.25em;
  color: rgba(255, 255, 255, 0.82);
  white-space: pre-wrap;
`;

const CopyButton = styled.button`
  position: absolute;
  left: 14px;
  top: 640px;
  width: 364px;
  height: 42px;
  border: 1px solid transparent;
  border-radius: 5px;
  background: url(${rectangle11Background});
  color: #fdfdfd;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.8125em;
  cursor: pointer;
`;

interface PromptQualityImprovedScreenProps {
  improvedPrompt: string;
  copied: boolean;
  onCopy: () => void;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const PromptQualityImprovedScreen: FC<PromptQualityImprovedScreenProps> = ({
  improvedPrompt,
  copied,
  onCopy,
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
}) => {
  return (
    <ScreenRoot>
      {!HIDE_MENU ? (
        <FlowMenu
          menuIcon={menuIcon}
          currentStep={currentStep}
          onStepSelect={onStepSelect}
          canOpenPrompt={canOpenPrompt}
          canOpenPayment={canOpenPayment}
          canOpenQuality={canOpenQuality}
        />
      ) : null}

      <HeaderTitle>Улучшенная версия</HeaderTitle>
      <Divider />
      <Subtitle>
        Цель и контекст заданы чётко, формат ответа понятен - модель сможет выдать
        точный и структурированный результат.
      </Subtitle>

      <PromptArea>
        <PromptAreaBackground src={promptInputBackground} alt="" />
        <PromptContent>{improvedPrompt}</PromptContent>
      </PromptArea>

      <CopyButton type="button" onClick={onCopy}>
        {copied ? 'Скопировано' : 'Копировать'}
      </CopyButton>
    </ScreenRoot>
  );
};
