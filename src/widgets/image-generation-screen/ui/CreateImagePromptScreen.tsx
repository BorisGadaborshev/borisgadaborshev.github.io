import styled from '@emotion/styled';
import { FC, ChangeEvent } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const svetBronzeTop = `${import.meta.env.BASE_URL}images/svetBronzeTop.png`;
const svetBronzeBottom = `${import.meta.env.BASE_URL}images/svetBronzeBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/image-gen-menu-icon.svg`;
const statusBar = `${import.meta.env.BASE_URL}images/image-gen-statusbar.png`;
const balanceIcon = `${import.meta.env.BASE_URL}images/image-gen-balance-icon.svg`;
const buttonBackground = `${import.meta.env.BASE_URL}images/image-gen-visualize-button-bg.svg`;
const favoritesIcon = `${import.meta.env.BASE_URL}images/image-gen-favorites-icon.svg`;

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
  left: 75px;
  top: 188px;
  width: 243px;
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
  top: 338px;
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

interface CreateImagePromptScreenProps {
  prompt: string;
  onPromptChange: (next: string) => void;
  onSubmit?: () => void;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const CreateImagePromptScreen: FC<CreateImagePromptScreenProps> = ({
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
        <Title>Из идеи — в картинку</Title>
      </TitleWrap>
      <SubtitleWrap>
        <Subtitle>Опиши, что хочешь увидеть, и мы создадим изображение с нуля.</Subtitle>
      </SubtitleWrap>

      <Field>
        <FieldBackground />
        <PromptInput
          value={prompt}
          onChange={handleChange}
          placeholder="Например: золотой ретро-автомобиль на закате в стиле киберпанк..."
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
