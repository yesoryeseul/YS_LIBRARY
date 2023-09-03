import * as S from './input.style';

interface InputProps {
  variant: 'primary' | 'lineType';
  shape: 'none' | 'primary';
  leng: 'pc' | 'tablet' | 'mobile';
}

const Input = ({ variant, shape, leng }: InputProps) => {
  return <S.Input variant={variant} shape={shape} leng={leng} />;
};

export default Input;
