import { Meta, StoryObj, field, params } from 'storybook'
import TagsField from './TagsField.component'

const meta: Meta<typeof TagsField> = {
  component: TagsField,
  title: 'Components/TagsField',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof TagsField>

export const Demo: Story = {
  parameters: params('TagsField'),
  args: {
    name: 'Demo',
  },
}
