import styled from '@emotion/styled';
import { FC, ChangeEvent } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const svetRedTop = `${import.meta.env.BASE_URL}images/svetRedTop.png`;
const svetRedBottom = `${import.meta.env.BASE_URL}images/svetRedBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/prompt-description-menu-icon.svg`;
const statusBar = `${import.meta.env.BASE_URL}images/prompt-description-statusbar.png`;
const balanceIcon = `${import.meta.env.BASE_URL}images/prompt-description-balance-icon.svg`;
const buttonBackground = `${import.meta.env.BASE_URL}images/prompt-description-button-bg.svg`;
const favoritesIcon = `${import.meta.env.BASE_URL}images/prompt-description-favorites-icon.svg`;

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

const SvetRedTop = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 393px;
  height: auto;
`;

const SvetRedBottom = styled.img`
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

const DecorativeMenuIcon = styled.img`
  position: absolute;
  left: 20px;
  top: 54px;
  width: 27px;
  height: 27px;
  pointer-events: none;
  z-index: 3;
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
  top: 158px;
  padding: 10px;
  width: 211px;
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

const Divider = styled.div`
  position: absolute;
  left: 18px;
  top: 220px;
  width: 357px;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
`;

const SubtitleWrap = styled.div`
  position: absolute;
  left: 15px;
  top: 228px;
  width: 364px;
  padding: 10px;
`;

const Subtitle = styled.p`
  margin: 0;
  width: 344px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 0.9375em;
  color: #ffffff;
  text-align: center;
`;

const Field = styled.div`
  position: absolute;
  left: 20px;
  top: 333px;
  width: 353px;
  height: 360px;
`;

const FieldBackground = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

const SubmitButton = styled.button`
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
  left: 58px;
  top: 7px;
  width: 39px;
  height: 39px;
`;

const ButtonLabel = styled.span`
  position: absolute;
  left: 112px;
  top: 21px;
  width: 180px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.6818182em;
  color: #ffffff;
  text-align: center;
`;

interface PromptDescriptionScreenProps {
  prompt: string;
  onPromptChange: (next: string) => void;
  onSubmit?: () => void;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const PromptDescriptionScreen: FC<PromptDescriptionScreenProps> = ({
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
    <Root>
      <BackgroundLayer>
        <SvetRedTop src={svetRedTop} alt="" />
        <SvetRedBottom src={svetRedBottom} alt="" />
      </BackgroundLayer>
      {/* <StatusBar src={statusBar} alt="" /> */}
      <DecorativeMenuIcon src={menuIcon} alt="" />

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
        <Title>Оживи свою идею</Title>
      </TitleWrap>
      <Divider />
      <SubtitleWrap>
        <Subtitle>Опиши сцену словами — а мы превратим её в видео.</Subtitle>
      </SubtitleWrap>

      <Field>
        <FieldBackground />
        <PromptInput
          value={prompt}
          onChange={handleChange}
          placeholder="Например: камера плавно приближается, ветер развевает волосы..."
        />
      </Field>

      <SubmitButton type="button" onClick={onSubmit}>
        <ButtonBg src={buttonBackground} alt="" />
        <ButtonIcon src={favoritesIcon} alt="" />
        <ButtonLabel>Визуализировать</ButtonLabel>
      </SubmitButton>
    </Root>
  );
};
