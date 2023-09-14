import { atom, useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import * as S from './Select.style';
import { SelectProps } from 'interfaces/Select.interface';

const isOpenAtom = atom(false);

const Select = ({ variant, selectedValue, onChange, ...rest }: SelectProps) => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom);
  const [currentValue, setCurrentValue] = useState(selectedValue);

  const options = [
    { label: '10개씩 보기', value: 10 },
    { label: '30개씩 보기', value: 30 },
    { label: '50개씩 보기', value: 50 },
  ];

  useEffect(() => {
    setCurrentValue(selectedValue);
  }, [selectedValue]);

  const onOpenControl = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) return setIsOpen(false);
  };

  const handleChangeValue = (value: number) => {
    setCurrentValue(value);
    setIsOpen(false);

    if (onChange) onChange(value);
  };

  const mainLabel = options.find((option) => option.value === currentValue);

  return (
    <S.Wrapper onClick={onOpenControl}>
      <S.Container variant={variant}>
        <S.Span>{mainLabel && mainLabel.label}</S.Span>
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
