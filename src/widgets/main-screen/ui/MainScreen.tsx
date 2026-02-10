import { FC, ChangeEvent } from 'react';
import { ImageUploadButton } from '@entities/image-upload';
import { Background } from './Background';
import { Header } from './Header';
import { Content } from './Content';

const menuIcon = `${import.meta.env.BASE_URL}images/menu-icon.svg`;
const arrowsIcon = `${import.meta.env.BASE_URL}images/arrows.svg`;
const galleryIcon = `${import.meta.env.BASE_URL}images/gallery-icon.svg`;

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
