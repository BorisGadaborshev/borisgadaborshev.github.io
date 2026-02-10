import { TelegramWebApp } from '@shared/types';

export const getTelegramWebApp = (): TelegramWebApp | null => {
  return window.Telegram?.WebApp || null;
};

const getTelegramVersionNumber = (tg: TelegramWebApp): number | null => {
  const raw = (tg as unknown as { version?: string }).version;
  if (!raw) return null;

  const n = Number.parseFloat(raw);
  return Number.isFinite(n) ? n : null;
};

export const initTelegramWebApp = (): void => {
  const tg = getTelegramWebApp();
  if (tg) {
    tg.ready();
    tg.expand();

    // setHeaderColor / setBackgroundColor доступны не во всех версиях Telegram WebApp.
    // Чтобы не спамить консоль предупреждениями, вызываем только при поддержке.
    const v = getTelegramVersionNumber(tg);
    const supportsColors = v === null ? false : v >= 6.1;

    if (supportsColors) {
      tg.setHeaderColor('#0E1116');
      tg.setBackgroundColor('#0E1116');
    }
  }
};
