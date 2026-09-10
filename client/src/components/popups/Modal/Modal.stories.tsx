import { Meta, StoryObj, field, params } from 'storybook'
import Button from 'components/actions/Button'
import Modal, { ModalProps } from './Modal.component'
import { modal } from './Modal.hooks'

const VARIANTS: ModalProps['position'][] = ['center', 'right']
const NAMES: ModalProps['name'][] = ['global']

const meta: Meta<typeof Modal> = {
  title: 'Components/Popups/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    title: field.reactNode(),
    children: field.reactNode(),
    position: field.variants(VARIANTS, 'ModalVariant'),
    name: field.variants(NAMES, 'ModalName'),
  },
}

export default meta

type Story = StoryObj<typeof Modal>

const render = (props: ModalProps) => {
  return (
    <div>
      <Modal name='global' {...props}>
        <div style={{ height: 2000 }} />
      </Modal>

      <Modal.Container name='global' />

      <Button content='Open modal' onClick={() => modal({ name: 'global' })} />
    </div>
  )
}

export const Demo: Story = {
  parameters: params('Modal'),
  render,
  args: {
    position: 'center',
    title: 'Title',
    name: 'global',
    actions: [
      { content: 'Reset', color: 'info' },
      { content: 'Save', color: 'success' },
    ],
  },
}
