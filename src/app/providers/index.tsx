import { FC, ReactNode } from 'react';
import { TelegramProvider } from './TelegramProvider';
import { GlobalStyles } from './GlobalStyles';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  return (
    <TelegramProvider>
      <GlobalStyles />
      {children}
    </TelegramProvider>
  );
};
