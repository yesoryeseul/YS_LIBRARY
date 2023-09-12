import { ChangeEvent } from 'react';
import * as S from './input.style';

interface InputProps {
  variant: 'primary' | 'lineType';
  shape: 'none' | 'primary';
  value?: string;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  variant,
  shape,
  value,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <S.Input
      placeholder={placeholder}
      variant={variant}
      shape={shape}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
