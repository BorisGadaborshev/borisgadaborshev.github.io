import styled from '@emotion/styled';
import { FC } from 'react';

import phoneTop from '/images/phoneTop.png';
import phoneBottom from '/images/phoneBottom.png';

const BackgroundContainer = styled.div`
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

export const Background: FC = () => {
  return (
    <BackgroundContainer>
      <PhoneTop src={phoneTop} alt="" />
      <PhoneBottom src={phoneBottom} alt="" />
    </BackgroundContainer>
  );
};
