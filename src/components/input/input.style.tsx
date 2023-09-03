import { css } from '@emotion/react';
import styled from '@emotion/styled';

export interface InputProps {
  variant: 'primary' | 'lineType';
  shape: 'none' | 'primary';
  leng: 'pc' | 'tablet' | 'mobile';
}

const variantCSS = {
  primary: css`
    border: 1px solid #ddd;
  `,
  lineType: css`
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid #ddd;
  `,
};

const shapeCSS = {
  none: css`
    border-radius: 0px;
  `,
  primary: css`
    border-radius: 12px;
  `,
};

const sizeCSS = {
  pc: css`
    width: 600px;
  `,
  tablet: css`
    width: 450px;
  `,
  mobile: css`
    width: 240px;
  `,
};

export const Input = styled.input<InputProps>`
  outline: none;
  ${({ variant }) => variantCSS[variant]}
  ${({ shape }) => shapeCSS[shape]}
  ${({ leng }) => sizeCSS[leng]}
`;
