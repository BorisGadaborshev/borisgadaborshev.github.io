import { FC, ChangeEvent } from 'react';
import { ImageUploadButton } from '@entities/image-upload';
import { Background } from './Background';
import { Header } from './Header';
import { Content } from './Content';

import menuIcon from '/images/menu-icon.svg';
import arrowsIcon from '/images/arrows.svg';
import galleryIcon from '/images/gallery-icon.svg';

interface MainScreenProps {
  onImageSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const MainScreen: FC<MainScreenProps> = ({ onImageSelect }) => {
  return (
    <>
      <Background />
      <Header menuIcon={menuIcon} />
      <Content arrowsIcon={arrowsIcon} />
      <ImageUploadButton onImageSelect={onImageSelect} icon={galleryIcon} />
    </>
  );
};
