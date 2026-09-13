import { Meta, StoryObj, field, params } from 'storybook'
import Button from 'components/actions/Button'
import Modal, { ModalProps } from './Modal.component'
import useModal, { modal } from './Modal.hooks'

const VARIANTS: ModalProps['position'][] = ['center', 'right']
const NAMES: ModalProps['name'][] = ['confirm']

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

export const Demo: Story = {
  parameters: params('Modal'),
  args: {
    position: 'center',
    title: 'Title',
    name: 'confirm',
    actions: [
      <Button content='Confirm' color='success' />,
      <Button content='cancel' start='close' color='error' />,
    ],
  },
  render: props => {
    const ConfirmModal = () => {
      const modal = useModal('confirm')

      return (
        <Modal
          title='Confirm operation'
          actions={[
            <Button content='Confirm' color='success' onClick={() => {
              modal.onSuccess?.()
              modal.onClose?.()
            }} />,
            <Button content='cancel' start='close' color='error' onClick={modal.onClose} />,
          ]}
          open={modal.open}
          onClose={modal.onClose}
          {...props}
        >
          <div style={{ height: 2000 }} />
        </Modal>
      )
    }

    return (
      <div>
        <ConfirmModal />

        <Modal.Container />

        <Button content='Open modal' onClick={() => modal({ name: 'confirm' })} />
      </div>
    )
  },
}
