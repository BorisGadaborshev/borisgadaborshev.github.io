import styled from '@emotion/styled';
import { FC, ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const StyledButton = styled.button`
  position: absolute;
  left: 20px;
  top: 727px;
  width: 353px;
  height: 57px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 4;
  display: flex;
  align-items: center;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;

  &:active {
    .button-background {
      opacity: 0.9;
    }
  }
`;

const ButtonBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 353px;
  height: 57px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border-radius: 36px;
  opacity: 0.5;
`;

const ButtonContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 1;
`;

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      <ButtonBackground className="button-background" />
      <ButtonContent>{children}</ButtonContent>
    </StyledButton>
  );
};
