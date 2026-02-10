import styled from '@emotion/styled';
import { FC, ImgHTMLAttributes } from 'react';

interface IconProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  size?: number;
}

const StyledIcon = styled.img<{ size?: number }>`
  width: ${props => props.size ? `${props.size}px` : 'auto'};
  height: ${props => props.size ? `${props.size}px` : 'auto'};
  object-fit: contain;
`;

export const Icon: FC<IconProps> = ({ src, alt, size, ...props }) => {
  return <StyledIcon src={src} alt={alt} size={size} {...props} />;
};
