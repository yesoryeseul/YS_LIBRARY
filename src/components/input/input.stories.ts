import Input from './input';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Component/Input',
  component: Input,
  argTypes: {
    variant: {
      options: ['primary', 'lineType'],
      control: { type: 'radio' },
    },
    shape: {
      options: ['none', 'primary'],
      control: { type: 'radio' },
    },
    leng: {
      options: ['pc', 'tablet', 'mobile'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    shape: 'primary',
    leng: 'pc',
  },
};
