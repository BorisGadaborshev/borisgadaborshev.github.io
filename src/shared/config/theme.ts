export const theme = {
  colors: {
    background: '#0E1116',
    primary: '#011F66',
    secondary: '#2079CC',
    white: '#FFFFFF',
    whiteTransparent: 'rgba(255, 255, 255, 0.1)',
    blackTransparent: 'rgba(0, 0, 0, 0.25)',
    whiteTransparent40: 'rgba(255, 255, 255, 0.4)',
  },
  fonts: {
    primary: "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    heading: "'Viga', sans-serif",
  },
  breakpoints: {
    mobile: '393px',
  },
} as const;

export type Theme = typeof theme;
