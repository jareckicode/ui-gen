import type { Meta, StoryObj } from '@storybook/react';
import { {{componentName}} } from './{{componentName}}';

const meta: Meta<typeof {{componentName}}> = {
  title: 'Components/{{componentName}}',
  component: {{componentName}},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Content to be rendered inside the component',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '{{componentName}} Content',
  },
};

export const WithCustomClasses: Story = {
  args: {
    children: '{{componentName}} with custom styling',
    className: 'bg-blue-500 text-white p-4 rounded',
  },
};

export const Empty: Story = {
  args: {},
}; 