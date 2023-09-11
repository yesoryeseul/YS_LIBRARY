import { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const metaSelect = {
  title: 'Component/Select',
  component: Select,
  argTypes: {
    variant: {
      options: ['primary'],
      control: { type: 'radio' },
    },
  },
} satisfies Meta<typeof Select>;

export default metaSelect;
type Story = StoryObj<typeof metaSelect>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    options: [
      { label: '10개씩 보기', value: 10 },
      { label: '30개씩 보기', value: 30 },
      { label: '50개씩 보기', value: 50 },
    ], // 예시 옵션
    selectedValue: 10, // 예시 초기 선택 값
    selectedLabel: '10개씩 보기', // 예시 초기 선택 값
    onChange: (e) => {}, // 예시 onChange 핸들러
  },
};
