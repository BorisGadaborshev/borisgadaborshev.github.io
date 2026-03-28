import { FC, useRef, type ChangeEventHandler } from 'react';
import styled from '@emotion/styled';
import { type FlowStep } from '@shared/ui';

const BG_TOP = `${import.meta.env.BASE_URL}images/svetPurpleTop.png`;
const BG_BOTTOM = `${import.meta.env.BASE_URL}images/svetPurpleBottom.png`;
const MENU_ICON = `${import.meta.env.BASE_URL}images/main-menu-icon.svg`;
const BALANCE_ICON = `${import.meta.env.BASE_URL}images/main-balance-icon.svg`;
const BUTTON_BG = `${import.meta.env.BASE_URL}images/video-final-button-bg.svg`;
const UPLOAD_ICON = `${import.meta.env.BASE_URL}images/gallery-icon.svg`;

interface EnhanceImageMainScreenProps {
  onImageSelected: (file: File) => void;
  currentStep?: FlowStep;
  onStepSelect?: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

const Root = styled.div`
  position: absolute;
  inset: 0;
  background: #090b16;
  border-radius: 20px;
  overflow: hidden;
`;

const TopLight = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  width: 390px;
  height: auto;
  transform: translateX(-50%);
  pointer-events: none;
`;

const BottomLight = styled.img`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 390px;
  height: auto;
  transform: translateX(-50%);
  pointer-events: none;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  min-height: 100%;
  padding: 12px 20px 28px;
`;

const Header = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuButton = styled.button`
  width: 34px;
  height: 34px;
  border: none;
  background: transparent;
  padding: 0;
`;

const MenuIcon = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const Balance = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 34px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  padding: 0 12px;
  color: #f9f9ff;
  font-size: 22px;
  font-weight: 400;
  line-height: 1;
`;

const BalanceIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const PreviewCard = styled.div`
  margin-top: 30px;
  width: 100%;
  height: 205px;
  border-radius: 32px;
  background:
    radial-gradient(120% 95% at 70% 10%, rgba(220, 112, 255, 0.68) 0%, rgba(220, 112, 255, 0.12) 52%, rgba(14, 10, 35, 0.65) 100%),
    linear-gradient(130deg, rgba(110, 78, 198, 0.36) 0%, rgba(23, 24, 70, 0.9) 100%);
  box-shadow:
    inset 0 0 42px rgba(255, 255, 255, 0.06),
    0 18px 44px rgba(8, 6, 20, 0.55);
`;

const Title = styled.h1`
  margin: 16px 0 6px;
  color: #ffffff;
  font-size: 56px;
  line-height: 0.9;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  max-width: 305px;
  color: #ffffff;
  font-size: 16px;
  line-height: 1.08;
  font-weight: 500;
`;

const Description = styled.p`
  margin: 22px 0 0;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  line-height: 1.15;
  font-weight: 400;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 16px;
  background: rgba(255, 255, 255, 0.45);
`;

const ExtraText = styled.p`
  margin: 10px 0 0;
  color: #ffffff;
  text-align: center;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 400;
`;

const UploadButton = styled.button`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: calc(84px + env(safe-area-inset-bottom, 0px));
  width: auto;
  min-height: 50px;
  border: none;
  border-radius: 30px;
  background: url(${BUTTON_BG}) center / 100% 100% no-repeat;
  color: #ffffff;
  padding: 0 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 18px;
  font-weight: 600;
`;

const UploadIcon = styled.img`
  width: 21px;
  height: 21px;
`;

export const EnhanceImageMainScreen: FC<EnhanceImageMainScreenProps> = ({
  onImageSelected,
  currentStep = 'select',
  onStepSelect = () => {},
  canOpenPrompt = false,
  canOpenPayment = false,
  canOpenQuality = false,
}) => {
  void currentStep;
  void onStepSelect;
  void canOpenPrompt;
  void canOpenPayment;
  void canOpenQuality;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePick = () => fileInputRef.current?.click();
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    onImageSelected(file);
    event.currentTarget.value = '';
  };

  return (
    <Root>
      <TopLight src={BG_TOP} alt="" />
      <BottomLight src={BG_BOTTOM} alt="" />
      <Content>
        <Header>
          <MenuButton type="button" aria-label="menu">
            <MenuIcon src={MENU_ICON} alt="" />
          </MenuButton>
          <Balance>
            <BalanceIcon src={BALANCE_ICON} alt="" />
            <span>200</span>
          </Balance>
        </Header>
        <PreviewCard />
        <Title>LIV-PIC</Title>
        <Subtitle>Загрузите любое изображение и ИИ его улучшит</Subtitle>
        <Description>
          Загрузи изображение, и мы улучшим его качество: повысим чёткость, добавим детали и сделаем
          картинку более чистой и яркой сохраняя оригинальный стиль фотографии.
        </Description>
        <Divider />
        <ExtraText>Подходит для портретов, старых снимков и креативных экспериментов!</ExtraText>

        <UploadButton type="button" onClick={handlePick}>
          <UploadIcon src={UPLOAD_ICON} alt="" />
          Выбрать изображение
        </UploadButton>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleChange}
        />
      </Content>
    </Root>
  );
};
