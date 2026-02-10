import { Global, css } from '@emotion/react';
import { FC } from 'react';

const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      sans-serif;
    line-height: 1.6;
    color: #fff;
    background-color: #0e1116;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    min-height: 100dvh;
    overflow: hidden;
  }

  #root {
    width: 100%;
    height: 100vh;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const GlobalStyles: FC = () => {
  return <Global styles={globalStyles} />;
};
