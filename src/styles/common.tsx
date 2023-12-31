import { css } from '@emotion/react';

export const flexCenter = css`
  display: flex;
  justify-content: center;
`;

export const boxShadow = css`
  box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, 0.05);
`;

export const breakpoints = [576, 768, 992, 1140];
export const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
