import { css } from '@emotion/react';
import styled from '@emotion/styled';

interface Props {
  variant: 'primary';
}

const variantCSS = {
  primary: css`
    border-bottom: 1px solid #ddd;
  `,
};

export const Wrapper = styled.div`
  position: relative;
`;

export const Container = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 96px;
  height: 40px;
  padding: 4px 12px;
  border: 1px solid #ddd;
  cursor: pointer;
  border-radius: 4px;
  ${({ variant }) => variantCSS[variant]}
`;
export const Span = styled.span`
  font-size: 13px;
`;

export const Select = styled.ul<Props>`
  position: absolute;
  z-index: 1;
  font-size: 13px;
  width: 120px;
  border-radius: 4px;
  margin-top: 10px;
  border: 1px solid #ddd;
  background-color: rgba(255, 255, 255, 0.8);
  list-style: none;
  padding: 0;
  ${({ variant }) => variantCSS[variant]}
`;

export const OneSelect = styled.li<Props>`
  color: #222;
  cursor: pointer;
  text-align: center;
  padding: 0.5rem 0;
  transition: all 0.1s;
  border-bottom: 1px solid #ddd;
  list-style: none;

  :last-of-type {
    border: none;
  }
  :hover {
    font-weight: bold;
    background-color: rgba(238, 238, 238, 0.8);
  }
  ${({ variant }) => variantCSS[variant]}
`;
