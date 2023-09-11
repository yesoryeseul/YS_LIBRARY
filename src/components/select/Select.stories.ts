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
      '정확도순',
      '발간일순',
      '10개씩 보기',
      '30개씩 보기',
      '50개씩 보기',
    ], // 예시 옵션
    selectedValue: '정확도순', // 예시 초기 선택 값
    onChange: (e) => {}, // 예시 onChange 핸들러
  },
};
