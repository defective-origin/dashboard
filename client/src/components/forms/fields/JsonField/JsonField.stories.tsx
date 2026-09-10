import { Meta, StoryObj, field, params } from 'storybook'
import JsonField from './JsonField.component'

const meta: Meta<typeof JsonField> = {
  component: JsonField,
  title: 'Components/JsonField',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
  },
}

export default meta

type Story = StoryObj<typeof JsonField>

export const Demo: Story = {
  parameters: params('JsonField'),
  args: {
    name: 'Demo',
  },
}
