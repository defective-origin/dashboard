import { Meta, StoryObj, field, params } from 'storybook'
import MarkupSpec from './MarkupSpec.component'

const meta: Meta<typeof MarkupSpec> = {
  component: MarkupSpec,
  title: 'Components/MarkupSpec',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof MarkupSpec>

export const Demo: Story = {
  parameters: params('MarkupSpec'),
  args: {
    className: 'Demo',
  },
}
