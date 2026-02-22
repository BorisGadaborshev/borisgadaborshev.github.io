import styled from '@emotion/styled';
import { FC, useEffect, useRef, useState } from 'react';

export type FlowStep = 'select' | 'prompt' | 'payment' | 'quality';

interface FlowMenuProps {
  menuIcon: string;
  currentStep: FlowStep;
  onStepSelect: (step: FlowStep) => void;
  canOpenPrompt?: boolean;
  canOpenPayment?: boolean;
  canOpenQuality?: boolean;
}

const MenuRoot = styled.div`
  position: absolute;
  left: 20px;
  top: 54px;
  z-index: 8;
`;

const MenuTrigger = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  margin: 0;
  width: 27px;
  height: 27px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuIcon = styled.img`
  width: 27px;
  height: 27px;
`;

const Dropdown = styled.div`
  position: absolute;
  left: 0;
  top: 35px;
  width: 188px;
  padding: 8px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(14, 17, 22, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.35);
`;

const StepItem = styled.button<{ active?: boolean }>`
  width: 100%;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
  color: #ffffff;
  background: ${({ active }) => (active ? 'rgba(32, 121, 204, 0.35)' : 'transparent')};
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FlowMenu: FC<FlowMenuProps> = ({
  menuIcon,
  currentStep,
  onStepSelect,
  canOpenPrompt = true,
  canOpenPayment = true,
  canOpenQuality = true,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const handleStepClick = (step: FlowStep) => {
    onStepSelect(step);
    setOpen(false);
  };

  return (
    <MenuRoot ref={rootRef}>
      <MenuTrigger
        type="button"
        aria-label="Открыть шаги"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon src={menuIcon} alt="Menu" />
      </MenuTrigger>

      {open ? (
        <Dropdown>
          <StepItem
            type="button"
            active={currentStep === 'select'}
            onClick={() => handleStepClick('select')}
          >
            Выбор фото
          </StepItem>
          <StepItem
            type="button"
            active={currentStep === 'prompt'}
            disabled={!canOpenPrompt}
            onClick={() => handleStepClick('prompt')}
          >
            Ввод промта
          </StepItem>
          <StepItem
            type="button"
            active={currentStep === 'payment'}
            disabled={!canOpenPayment}
            onClick={() => handleStepClick('payment')}
          >
            Оплата
          </StepItem>
          <StepItem
            type="button"
            active={currentStep === 'quality'}
            disabled={!canOpenQuality}
            onClick={() => handleStepClick('quality')}
          >
            Проверка промпта
          </StepItem>
        </Dropdown>
      ) : null}
    </MenuRoot>
  );
};
