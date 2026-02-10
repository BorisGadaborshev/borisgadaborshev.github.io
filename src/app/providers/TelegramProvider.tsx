import { FC, ReactNode, useEffect } from 'react';
import { initTelegramWebApp } from '@shared/lib';

interface TelegramProviderProps {
  children: ReactNode;
}

export const TelegramProvider: FC<TelegramProviderProps> = ({ children }) => {
  useEffect(() => {
    initTelegramWebApp();
  }, []);

  return <>{children}</>;
};
