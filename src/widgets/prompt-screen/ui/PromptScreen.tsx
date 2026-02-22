import styled from '@emotion/styled';
import { FC, ChangeEvent } from 'react';
import { Button, FlowMenu, FlowStep } from '@shared/ui';

const favoritesIcon = `${import.meta.env.BASE_URL}images/favorites-icon.svg`;
const phoneTop = `${import.meta.env.BASE_URL}images/phoneTop.png`;
const phoneBottom = `${import.meta.env.BASE_URL}images/phoneBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/menu-icon.svg`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
`;

const PhoneTop = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 393px;
  height: auto;
`;

const PhoneBottom = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 393px;
  height: auto;
`;

const TextBlock = styled.div`
  position: absolute;
  left: 15px;
  top: 168px;
  width: 364px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  z-index: 6;
`;

const Title = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.9090909090909091em;
  color: #ffffff;
  text-align: center;
  margin: 0;
  white-space: pre-line;
  width: 317px;
`;

const Subtitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 0.9375em;
  color: #ffffff;
  text-align: center;
  width: 344px;
  margin: 0;
`;

const Field = styled.div`
  position: absolute;
  left: 20px;
  top: 338px;
  width: 353px;
  height: 360px;
  z-index: 6;
`;

const FieldBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 353px;
  height: 360px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 36px;
  opacity: 0.5;
`;

const PromptInput = styled.textarea`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  resize: none;
  background: transparent;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.2;
  color: #ffffff;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const FavoritesIcon = styled.img`
  position: absolute;
  left: 57px;
  top: 7px;
  width: 39px;
  height: 39px;
  z-index: 1;
  pointer-events: none;
`;

const ButtonLabel = styled.div`
  position: absolute;
  left: 111px;
  top: 21px;
  width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const LabelText = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.6818181818181818em;
  color: #ffffff;
  text-align: center;
  white-space: nowrap;
`;

interface PromptScreenProps {
  prompt: string;
  onPromptChange: (next: string) => void;
  onSubmit?: () => void;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const PromptScreen: FC<PromptScreenProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
}) => {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onPromptChange(e.target.value);
  };

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
      <BackgroundLayer>
        <PhoneTop src={phoneTop} alt="" />
        <PhoneBottom src={phoneBottom} alt="" />
      </BackgroundLayer>
      <TextBlock>
        <Title>{'Опишите, как должна ожить\nфотография'}</Title>
        <br />
        <Subtitle>
          Движения, эмоции, настроение — всё, что вы представили, мы превратим в
          видео.
        </Subtitle>
      </TextBlock>

      <Field>
        <FieldBackground />
        <PromptInput
          value={prompt}
          onChange={handleChange}
          placeholder="Например: улыбка, моргнуть, повернуть голову..."
        />
      </Field>

      <Button onClick={onSubmit}>
        <FavoritesIcon src={favoritesIcon} alt="" />
        <ButtonLabel>
          <LabelText>Оживить момент</LabelText>
        </ButtonLabel>
      </Button>
    </>
  );
};

