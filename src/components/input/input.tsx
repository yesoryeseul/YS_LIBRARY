import { InputComponentsProps } from 'models/Input.interface';
import * as S from './input.style';

const Input = ({
  variant,
  shape,
  value,
  placeholder,
  onChange,
}: InputComponentsProps) => {
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
