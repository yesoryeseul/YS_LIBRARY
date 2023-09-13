import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    line-height: 1;
  }

  body {
    font-family: 'Noto Sans KR', sans-serif;
  }

  h1 {
    font-family: 'Montserrat', sans-serif;
  }

  ul,
  li {
    list-style: none;
  }

  input,
  button {
    border: none;
    outline: none;
  }
`;
