import { TelegramWebApp } from '@shared/types';

export const getTelegramWebApp = (): TelegramWebApp | null => {
  return window.Telegram?.WebApp || null;
};

export const initTelegramWebApp = (): void => {
  const tg = getTelegramWebApp();
  if (tg) {
    tg.ready();
    tg.expand();
    tg.setHeaderColor('#0E1116');
    tg.setBackgroundColor('#0E1116');
  }
};
