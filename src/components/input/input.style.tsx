import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { InputStylesProps } from 'types/Input.interface';
import { mq } from 'styles/common';

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

export const Input = styled.input<InputStylesProps>`
  outline: none;
  ${({ variant }) => variantCSS[variant]}
  ${({ shape }) => shapeCSS[shape]}

  width: 600px;

  ${mq[1]} {
    width: 450px;
  }
  ${mq[0]} {
    width: 320px;
  }
`;
