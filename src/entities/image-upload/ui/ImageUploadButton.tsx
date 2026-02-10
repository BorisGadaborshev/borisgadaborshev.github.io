import styled from '@emotion/styled';
import { FC, useRef, ChangeEvent } from 'react';
import { Button } from '@shared/ui';

interface ImageUploadButtonProps {
  onImageSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  icon: string;
}

const GalleryIcon = styled.img`
  position: absolute;
  left: 36px;
  top: 10px;
  width: 35.51px;
  height: 35.51px;
  z-index: 1;
`;

const ButtonLabel = styled.div`
  position: absolute;
  left: 82px;
  top: 21px;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1;
`;

const LabelText = styled.span`
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 22px;
  line-height: 0.6818181818181818em;
  color: #ffffff;
  text-align: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

export const ImageUploadButton: FC<ImageUploadButtonProps> = ({
  onImageSelect,
  icon,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <>
      <Button onClick={handleClick}>
        <GalleryIcon src={icon} alt="Gallery" />
        <ButtonLabel>
          <LabelText>Выбрать изображение</LabelText>
        </ButtonLabel>
      </Button>
      <HiddenInput
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={onImageSelect}
      />
    </>
  );
};
