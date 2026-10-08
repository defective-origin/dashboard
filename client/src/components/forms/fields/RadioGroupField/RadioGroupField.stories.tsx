import { Meta, StoryObj, field, params } from 'storybook'
import RadioGroupField from './RadioGroupField.component'
import { RadioField } from '../RadioField'

const meta: Meta<typeof RadioGroupField> = {
  component: RadioGroupField,
  title: 'Components/Forms/RadioGroupField',
  tags: ['autodocs'],
  argTypes: {
    columns: field.number(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof RadioGroupField>

export const Demo: Story = {
  parameters: params('RadioGroupField'),
  args: {
    label: 'Radio Group',
    columns: 2,
    init: 'b',
    children: [
      <RadioField label='a' value='a' />,
      <RadioField label='b' value='b' />,
    ],
  },
}
