// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import Modal, { ModalProps } from './Modal.component'
import useModal from './Modal.hook'
import Button from 'components/Button'

const VARIANTS: ModalProps['v'][] = ['center', 'right']
const NAMES: ModalProps['name'][] = ['global', 'board-settings', 'widget-settings']

const meta: Meta<typeof Modal> = {
  title: 'Components/Popup/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    title: field.reactNode(),
    children: field.reactNode(),
    v: field.variants(VARIANTS, 'ModalVariant'),
    name: field.variants(NAMES, 'ModalName'),
  },
}

export default meta

type Story = StoryObj<typeof Modal>

const render = (props: ModalProps) => {
  const modal = useModal()

  return (
    <>
      <Modal {...props}>
        <div style={{ height: 2000 }} />
      </Modal>

      <Button content='Open modal' onClick={() => modal({ name: 'global' })} />
    </>
  )
}

export const Demo: Story = {
  parameters: params('Modal'),
  render,
  args: {
    v: 'center',
    title: 'Title',
    name: 'global',
    actions: [
      { content: 'Reset', color: 'info' },
      { content: 'Save', color: 'success' },
    ],
  },
}
