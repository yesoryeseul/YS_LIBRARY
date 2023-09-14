export interface SelectProps {
  variant: 'primary';
  options: { label: string; value: number }[];
  selectedValue: number;
  selectedLabel: string;
  onChange?: (value: number) => void;
}
