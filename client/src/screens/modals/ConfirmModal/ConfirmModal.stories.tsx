import { Meta, StoryObj, field, params } from 'storybook'
import ConfirmModal from './ConfirmModal.component'

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
  title: 'Components/ConfirmModal',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof ConfirmModal>

export const Demo: Story = {
  parameters: params('ConfirmModal'),
  args: {
    name: 'Demo',
  },
}
