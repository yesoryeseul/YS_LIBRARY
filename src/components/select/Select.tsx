import { atom, useAtom } from 'jotai';
import { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import * as S from './Select.style';

export interface SelectProps {
  variant: 'primary';
  options: { label: string; value: number }[];
  selectedValue: number;
  selectedLabel: string;
  // onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onChange?: (value: number) => void;
}

const isOpenAtom = atom(false);

const Select = ({
  variant,
  options,
  selectedValue,
  selectedLabel,
  onChange,
  ...rest
}: SelectProps) => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [currentValue, setCurrentValue] = useState(selectedValue);
  const [label, setLabel] = useState(selectedLabel);

  const onOpenControl = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) return setIsOpen(false);
  };

  const handleChangeValue = (value: number) => {
    setCurrentValue(value);
    setIsOpen(false);

    if (onChange) onChange(value);
    if (setLabel) {
      const selectedOption = options.find((option) => option.value === value);
      if (selectedOption) {
        setLabel(selectedOption.label);
      }
    }
  };

  return (
    <S.Wrapper onClick={onOpenControl}>
      <S.Container variant={variant}>
        <S.Span>{label}</S.Span>
        <AiFillCaretDown size={16} />
      </S.Container>
      {isOpen && (
        <S.Select variant={variant}>
          {options.map((option, index: number) => (
            <S.OneSelect
              key={index}
              variant={variant}
              onClick={() => handleChangeValue(option.value)}
            >
              {option.label}
            </S.OneSelect>
          ))}
        </S.Select>
      )}
    </S.Wrapper>
  );
};

export default Select;
