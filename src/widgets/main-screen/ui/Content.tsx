import styled from '@emotion/styled';
import { FC } from 'react';

const TitleSection = styled.div`
  position: absolute;
  left: 8px;
  top: 417px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  padding: 10px;
  z-index: 4;
  width: 377px;
`;

const AppName = styled.h1`
  display: grid;
  font-family: 'Viga', sans-serif;
  font-weight: 400;
  font-size: 68px;
  line-height: 0.4117647058823529em;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-align: right;
  margin: 0;
`;

const Arrows = styled.img`
  position: absolute;
  left: 18px;
  top: 438.45px;
  width: 396.7px;
  height: 197.55px;
  z-index: 1;
  pointer-events: none;
`;

const HeadingSection = styled.div`
  position: absolute;
  left: 10px;
  top: 470px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  z-index: 4;
  width: 373px;
`;

const Heading = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.9090909090909091em;
  color: #ffffff;
  text-align: center;
  margin: 0;
`;

const DescriptionSection = styled.div`
  position: absolute;
  left: 15px;
  top: 572px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  z-index: 4;
  width: 364px;
`;

const Description = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 0.9375em;
  color: #ffffff;
  text-align: center;
  width: 344px;
  margin: 0;
`;

interface ContentProps {
  arrowsIcon: string;
}

export const Content: FC<ContentProps> = ({ arrowsIcon }) => {
  return (
    <>
      <TitleSection>
        <AppName>LIV-PIC</AppName>
      </TitleSection>
      <Arrows src={arrowsIcon} alt="Arrows" />
      <HeadingSection>
        <Heading>
          Загрузите любое изображение и<br />
          превратите его в живой портрет
        </Heading>
      </HeadingSection>
      <DescriptionSection>
        <Description>
          Мини-апп автоматически добавляет реалистичную мимику, движения и эмоции,
          <br />
          сохраняя оригинальный стиль фотографии.
          <br />
          <br />
          Подходит для портретов, старых снимков и креативных экспериментов!
        </Description>
      </DescriptionSection>
    </>
  );
};
