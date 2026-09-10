import { Meta, StoryObj, field, params } from 'storybook'
import ReviewsModal from './ReviewsModal.component'

const meta: Meta<typeof ReviewsModal> = {
  component: ReviewsModal,
  title: 'Components/ReviewsModal',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof ReviewsModal>

export const Demo: Story = {
  parameters: params('ReviewsModal'),
  args: {
    name: 'Demo',
  },
}
