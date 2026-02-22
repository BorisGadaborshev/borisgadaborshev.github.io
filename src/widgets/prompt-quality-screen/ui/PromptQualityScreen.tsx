import styled from '@emotion/styled';
import { FC } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const menuIcon = `${import.meta.env.BASE_URL}images/menu-icon.svg`;
const searchIcon = `${import.meta.env.BASE_URL}images/search-icon-left.svg`;
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

const PromptTextarea = styled.textarea`
  position: absolute;
  left: 15px;
  top: 87px;
  width: 325px;
  height: 177px;
  padding: 14px 16px;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  color: rgba(255, 255, 255, 0.82);
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.25em;

  &::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }
`;

const CheckButton = styled.button`
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

  &:disabled {
    opacity: 0.75;
    cursor: wait;
  }
`;

const CheckLabel = styled.span`
  display: inline-block;
  transform: translateX(-4px);
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 7px;
  width: 27px;
  height: 27px;
`;

const RightIcon = styled(SearchIcon)`
  right: 98px;
`;

interface PromptQualityScreenProps {
  promptValue: string;
  onPromptChange: (value: string) => void;
  onAnalyze: () => void;
  loading?: boolean;
  error?: string | null;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const PromptQualityScreen: FC<PromptQualityScreenProps> = ({
  promptValue,
  onPromptChange,
  onAnalyze,
  loading = false,
  error,
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

      <HeaderTitle>{'Проверить качество\nсвоего AI-промта'}</HeaderTitle>
      <Subtitle>
        {'Анализ вашего промпта, выявление слабых\nсторон, рекомендации и улучшение промпта'}
      </Subtitle>
      <Divider />

      <PromptArea>
        <PromptAreaBackground src={promptInputBackground} alt="" />
        <PromptTextarea
          value={promptValue}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="Введите промпт..."
        />
      </PromptArea>

      <CheckButton type="button" disabled={loading} onClick={onAnalyze}>
        <CheckLabel>{loading ? 'Проверяем...' : 'Проверить'}</CheckLabel>
        <RightIcon src={searchIcon} alt="" />
      </CheckButton>

      {error ? (
        <p
          style={{
            position: 'absolute',
            left: 20,
            right: 20,
            top: 690,
            margin: 0,
            textAlign: 'center',
            color: '#F7B4B4',
            fontFamily: 'Segoe UI, Roboto, sans-serif',
            fontSize: 13,
            lineHeight: '1.2em',
          }}
        >
          {error}
        </p>
      ) : null}
    </ScreenRoot>
  );
};
