import styled from '@emotion/styled';
import { FC, ChangeEvent } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const svetGreenTop = `${import.meta.env.BASE_URL}images/svetGreenTop.png`;
const svetGreenBottom = `${import.meta.env.BASE_URL}images/svetGreenBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/edit-gen-menu-icon.svg`;
const statusBar = `${import.meta.env.BASE_URL}images/edit-gen-statusbar.png`;
const balanceIcon = `${import.meta.env.BASE_URL}images/edit-gen-balance-icon.svg`;
const buttonBackground = `${import.meta.env.BASE_URL}images/edit-gen-change-button-bg.svg`;
const favoritesIcon = `${import.meta.env.BASE_URL}images/edit-gen-favorites-icon.svg`;

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
  left: 78px;
  top: 168px;
  width: 237px;
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
  font-size: 16px;
  line-height: 0.9375em;
  color: #fff;
  text-align: center;
`;
const Field = styled.div`
  position: absolute;
  left: 20px;
  top: 338px;
  width: 353px;
  height: 360px;
`;
const FieldBg = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
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
  font-size: 16px;
  color: #fff;
  &::placeholder { color: rgba(255, 255, 255, 0.6); }
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
const BtnBg = styled.img`
  position: absolute;
  inset: 0;
  width: 353px;
  height: 57px;
`;
const BtnIcon = styled.img`
  position: absolute;
  left: 86px;
  top: 7px;
  width: 39px;
  height: 39px;
`;
const BtnLabel = styled.span`
  position: absolute;
  left: 140px;
  top: 21px;
  width: 103px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.6818182em;
  color: #fff;
  text-align: center;
`;

interface EditImagePromptScreenProps {
  prompt: string;
  onPromptChange: (next: string) => void;
  onSubmit?: () => void;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const EditImagePromptScreen: FC<EditImagePromptScreenProps> = ({
  prompt,
  onPromptChange,
  onSubmit,
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
        <Title>{'Новая версия твоего\nизображения'}</Title>
      </TitleWrap>
      <SubtitleWrap>
        <Subtitle>
          Опиши, что хочешь изменить: новый стиль, детали, атмосфера или даже целая сцена
        </Subtitle>
      </SubtitleWrap>
      <Field>
        <FieldBg />
        <PromptInput
          value={prompt}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onPromptChange(e.target.value)}
          placeholder="Например: сделать фон городским, добавить теплый свет, поменять стиль..."
        />
      </Field>
      <SubmitButton type="button" onClick={onSubmit}>
        <BtnBg src={buttonBackground} alt="" />
        <BtnIcon src={favoritesIcon} alt="" />
        <BtnLabel>Изменить</BtnLabel>
      </SubmitButton>
    </Root>
  );
};
