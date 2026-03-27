import styled from '@emotion/styled';
import { FC, ChangeEvent, useRef } from 'react';
import { FlowMenu, FlowStep } from '@shared/ui';

const svetGreenTop = `${import.meta.env.BASE_URL}images/svetGreenTop.png`;
const svetGreenBottom = `${import.meta.env.BASE_URL}images/svetGreenBottom.png`;
const menuIcon = `${import.meta.env.BASE_URL}images/edit-gen-menu-icon.svg`;
const balanceIcon = `${import.meta.env.BASE_URL}images/edit-gen-balance-icon.svg`;
const chooseButtonBg = `${import.meta.env.BASE_URL}images/edit-gen-choose-button-bg.svg`;
const galleryIcon = `${import.meta.env.BASE_URL}images/edit-gen-gallery-icon.svg`;
const arrows = `${import.meta.env.BASE_URL}images/edit-gen-arrows.svg`;

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
const FeaturesPreview = styled.div`
  position: absolute;
  left: 20px;
  top: 96px;
  width: 353px;
  height: 291px;
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.5;
`;
const Brand = styled.div`
  position: absolute;
  left: 8px;
  top: 417px;
  padding: 10px;
  font-family: 'Viga', sans-serif;
  font-size: 68px;
  line-height: 0.4117647em;
  letter-spacing: -0.04em;
  color: #fff;
`;
const Arrows = styled.img`
  position: absolute;
  left: 18px;
  top: 438.45px;
  width: 396.7px;
  height: 197.55px;
`;
const TitleWrap = styled.div`
  position: absolute;
  left: 10px;
  top: 470px;
  width: 373px;
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
  top: 572px;
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
  white-space: pre-line;
`;
const ChooseButton = styled.button`
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
const ChooseBg = styled.img`
  position: absolute;
  inset: 0;
  width: 353px;
  height: 57px;
`;
const ChooseIcon = styled.img`
  position: absolute;
  left: 36px;
  top: 10.75px;
  width: 35.51px;
  height: 35.51px;
`;
const ChooseLabel = styled.span`
  position: absolute;
  left: 82px;
  top: 21px;
  width: 236px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.6818182em;
  color: #fff;
  text-align: center;
`;
const HiddenInput = styled.input`
  display: none;
`;

interface EditImageMainScreenProps {
  onImageSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onImageChosen: () => void;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

export const EditImageMainScreen: FC<EditImageMainScreenProps> = ({
  onImageSelect,
  onImageChosen,
  currentStep,
  onStepSelect,
  canOpenPrompt,
  canOpenPayment,
  canOpenQuality,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    onImageSelect(e);
    if (e.target.files?.[0]) onImageChosen();
  };
  return (
    <Root>
      <BgLayer>
        <Top src={svetGreenTop} alt="" />
        <Bottom src={svetGreenBottom} alt="" />
      </BgLayer>
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
      <FeaturesPreview />
      <Brand>LIV-PIC</Brand>
      <Arrows src={arrows} alt="" />
      <TitleWrap>
        <Title>{'Загрузите любое изображение\nи измени по своему желанию'}</Title>
      </TitleWrap>
      <SubtitleWrap>
        <Subtitle>
          {'Мини-апп автоматически добавляет реалистичную мимику, движения и эмоции,\n\nсохраняя оригинальный стиль фотографии.\n\nПодходит для портретов, старых снимков и креативных экспериментов!'}
        </Subtitle>
      </SubtitleWrap>
      <ChooseButton type="button" onClick={() => inputRef.current?.click()}>
        <ChooseBg src={chooseButtonBg} alt="" />
        <ChooseIcon src={galleryIcon} alt="" />
        <ChooseLabel>Выбрать изображение</ChooseLabel>
      </ChooseButton>
      <HiddenInput ref={inputRef} type="file" accept="image/*" onChange={handleFile} />
    </Root>
  );
};
