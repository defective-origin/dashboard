import { Meta, StoryObj, params } from 'storybook'
import SliderField from './SliderField.component'

const meta: Meta<typeof SliderField> = {
  title: 'Components/Forms/SliderField',
  component: SliderField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SliderField>

export const Demo: Story = {
  parameters: params('SliderField'),
  args: {
    label: 'Label',
    init: 100,
    help: 'help text',
    checkOnBlur: true,
    checkOnChange: true,
    rules: [
      value => value > 50 && 'NUMBER CANNOT BE MORE THEN 5',
    ],
  },
}
