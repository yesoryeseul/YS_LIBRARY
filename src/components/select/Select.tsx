import { atom, useAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import * as S from './Select.style';

export interface SelectProps {
  variant: 'primary';
  options: string[];
  selectedValue: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const isOpenAtom = atom(false);

const Select = ({
  variant,
  options,
  selectedValue,
  onChange,
  ...rest
}: SelectProps) => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [currentValue, setCurrentValue] = useState(selectedValue);

  const onOpenControl = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) return setIsOpen(false);
  };

  const handleChangeValue = (value: any) => {
    setCurrentValue(value);
    setIsOpen(false);

    if (onChange) onChange(value);
  };

  return (
    <S.Wrapper onClick={onOpenControl}>
      <S.Container variant={variant}>
        <S.Span>{currentValue}</S.Span>
        <AiFillCaretDown size={16} />
      </S.Container>
      {isOpen && (
        <S.Select variant={variant}>
          {options.map((option: string, index: number) => (
            <S.OneSelect
              key={index}
              variant={variant}
              onClick={() => handleChangeValue(option)}
            >
              {option}
            </S.OneSelect>
          ))}
        </S.Select>
      )}
    </S.Wrapper>
  );
};

export default Select;
