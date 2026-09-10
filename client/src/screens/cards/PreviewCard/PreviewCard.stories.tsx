import { Meta, StoryObj, field, params } from 'storybook'
import PreviewCard from './PreviewCard.component'

const meta: Meta<typeof PreviewCard> = {
  component: PreviewCard,
  title: 'Screens/Cards/PreviewCard',
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof PreviewCard>

export const Demo: Story = {
  parameters: params('PreviewCard'),
  args: {
    options: {
      id: 0,
      name: 'CARD NAME',
      description: 'CARD DESCRIPTION',
      author: 0,
      access: 'PRIVATE',
    },
  },
}
