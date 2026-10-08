import { Meta, StoryObj, field, params } from 'storybook'
import CheckboxListField from './CheckboxListField.component'
import { CheckboxField } from '../CheckboxField'

const meta: Meta<typeof CheckboxListField> = {
  component: CheckboxListField,
  title: 'Components/Forms/CheckboxListField',
  tags: ['autodocs'],
  argTypes: {
    columns: field.number(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof CheckboxListField>

export const Demo: Story = {
  parameters: params('CheckboxListField'),
  args: {
    label: 'Checkbox List',
    columns: 2,
    init: ['b'],
    children: [
      <CheckboxField label='a' value='a' />,
      <CheckboxField label='b' value='b' />,
    ],
  },
}

