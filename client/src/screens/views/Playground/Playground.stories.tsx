import { Meta, StoryObj, field, params } from 'storybook'
import Playground from './Playground.component'

const meta: Meta<typeof Playground> = {
  component: Playground,
  title: 'Components/Playground',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof Playground>

export const Demo: Story = {
  parameters: params('Playground'),
  args: {
    name: 'Demo',
  },
}
