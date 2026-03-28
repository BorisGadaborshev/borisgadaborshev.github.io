import styled from '@emotion/styled';
import { FC } from 'react';

const menuIcon = `${import.meta.env.BASE_URL}images/main-menu-icon.svg`;
const balanceIcon = `${import.meta.env.BASE_URL}images/main-balance-icon.svg`;
const option1Bg = new URL('../../../../images/phoneBlue.png', import.meta.url).href;
const option2Bg = new URL('../../../../images/phoneRed.png', import.meta.url).href;
const option3Bg = new URL('../../../../images/phoneBronze.png', import.meta.url).href;
const option4Bg = new URL('../../../../images/phoneGreen.png', import.meta.url).href;
const option5Bg = new URL('../../../../images/phonePurple.png', import.meta.url).href;

const Screen = styled.div`
  position: absolute;
  inset: 0;
  background: #0e1116;
  border-radius: 20px;
  overflow: hidden;
`;

const MenuIcon = styled.img`
  position: absolute;
  left: 20px;
  top: 54px;
  width: 27px;
  height: 27px;
`;

const Brand = styled.div`
  position: absolute;
  left: 53.5px;
  top: 49px;
  padding: 5px;
  font-family: 'Viga', sans-serif;
  font-weight: 400;
  font-size: 24px;
  line-height: 1.1666667em;
  letter-spacing: -0.04em;
  color: #ffffff;
`;

const Balance = styled.div`
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

const BalanceButton = styled.button`
  position: absolute;
  left: 282px;
  top: 51px;
  width: 91px;
  height: 33px;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  z-index: 2;
`;

const Options = styled.div`
  position: absolute;
  left: 20px;
  top: 104px;
  width: 353px;
  height: 680px;
`;

const OptionCard = styled.button<{ top: number; clickable?: boolean }>`
  position: absolute;
  left: 0;
  top: ${({ top }) => top}px;
  width: 353px;
  height: 120px;
  border: 0;
  padding: 0;
  background: transparent;
  text-align: left;
  color: inherit;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
`;

const DisabledOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: rgba(14, 17, 22, 0.58);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const DisabledText = styled.span`
  padding: 8px 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
`;

const CardBg = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  width: 353px;
  height: 120px;
  object-fit: cover;
  border-radius: 20px;
  pointer-events: none;
`;

const CardTitle = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 217px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 19px;
  line-height: 1.0526316em;
  color: #ffffff;
  white-space: pre-line;
`;

const CardDivider = styled.div`
  position: absolute;
  left: 0;
  top: 57px;
  width: 225px;
  height: 1px;
  background: rgba(255, 255, 255, 0.4);
`;

const CardDescription = styled.div<{ width?: number }>`
  position: absolute;
  left: 10px;
  top: 65px;
  width: ${({ width = 217 }) => width}px;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 1.25em;
  color: #ffffff;
`;

const CardTokens = styled.div<{ left: number }>`
  position: absolute;
  left: ${({ left }) => left}px;
  top: 48px;
  padding: 2px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.25em;
  font-variant: small-caps;
  color: #ffffff;
`;

interface MainEntryScreenProps {
  onOpenImageSelection: () => void;
  onOpenDescriptionPrompt: () => void;
  onOpenCreateImagePrompt: () => void;
  onOpenEditImageFlow: () => void;
  onOpenEnhanceImageFlow: () => void;
  onOpenTopUp: () => void;
}

interface OptionCardData {
  top: number;
  bg: string;
  title: string;
  description: string;
  tokens: string;
  tokenLeft: number;
  descWidth: number;
  onClick?: () => void;
  disabled?: boolean;
}

export const MainEntryScreen: FC<MainEntryScreenProps> = ({
  onOpenImageSelection,
  onOpenDescriptionPrompt,
  onOpenCreateImagePrompt,
  onOpenEditImageFlow,
  onOpenEnhanceImageFlow,
  onOpenTopUp,
}) => {
  void onOpenDescriptionPrompt;
  void onOpenCreateImagePrompt;
  void onOpenEditImageFlow;
  void onOpenEnhanceImageFlow;
  const options: OptionCardData[] = [
    {
      top: 0,
      bg: option1Bg,
      title: 'Сгенерировать видео из изображения',
      description:
        'Оживи любую картинку — преврати статичное изображение в динамичное видео за несколько секунд.',
      tokens: '100 токенов',
      tokenLeft: 250,
      descWidth: 244,
      onClick: onOpenImageSelection,
    },
    {
      top: 140,
      bg: option2Bg,
      title: 'Сгенерировать видео\nпо описанию',
      description:
        'Просто опиши идею словами, а магия ИИ создаст уникальное видео прямо из твоего воображения.',
      tokens: '120 токенов',
      tokenLeft: 250,
      descWidth: 217,
      disabled: true,
    },
    {
      top: 280,
      bg: option3Bg,
      title: 'Создать изображение',
      description:
        'Напиши, что хочешь увидеть — и мы нарисуем это с нуля, будто по взмаху волшебной палочки.',
      tokens: '70 токенов',
      tokenLeft: 259,
      descWidth: 217,
      disabled: true,
    },
    {
      top: 420,
      bg: option4Bg,
      title: 'Изменить изображение по промпту',
      description:
        'Скажи, что изменить, и изображение преобразится: новый стиль, детали или атмосфера — всё возможно.',
      tokens: '80 токенов',
      tokenLeft: 259,
      descWidth: 217,
      disabled: true,
    },
    {
      top: 560,
      bg: option5Bg,
      title: 'Улучшить качество изображения',
      description:
        'Верни чёткость и детали — сделаем картинку ярче, резче и красивее без потери магии момента.',
      tokens: '75 токенов',
      tokenLeft: 259,
      descWidth: 217,
      disabled: true,
    },
  ];

  return (
    <Screen>
      <MenuIcon src={menuIcon} alt="" />
      <Brand>LIV-PIC</Brand>
      <Balance />
      <BalanceIcon src={balanceIcon} alt="" />
      <BalanceValue>100</BalanceValue>
      <BalanceButton type="button" onClick={onOpenTopUp} aria-label="Открыть пополнение токенов" />

      <Options>
        {options.map((option) => (
          <OptionCard
            key={option.title}
            type="button"
            top={option.top}
            clickable={Boolean(option.onClick) && !option.disabled}
            onClick={option.disabled ? undefined : option.onClick}
            disabled={option.disabled}
          >
            <CardBg src={option.bg} alt="" />
            <CardTitle>{option.title}</CardTitle>
            <CardDivider />
            <CardDescription width={option.descWidth}>{option.description}</CardDescription>
            <CardTokens left={option.tokenLeft}>{option.tokens}</CardTokens>
            {option.disabled ? (
              <DisabledOverlay>
                <DisabledText>В процессе разработки</DisabledText>
              </DisabledOverlay>
            ) : null}
          </OptionCard>
        ))}
      </Options>
    </Screen>
  );
};
