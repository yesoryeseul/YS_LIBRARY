import { ChangeEvent } from 'react';

export interface InputStylesProps {
  variant: 'primary' | 'lineType';
  shape: 'none' | 'primary';
}

export interface InputComponentsProps extends InputStylesProps {
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
