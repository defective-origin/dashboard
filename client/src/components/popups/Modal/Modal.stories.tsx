// eslint-disable-next-line no-restricted-imports
import { field, params } from '../../../../.storybook/tools'
import type { Meta, StoryObj } from '@storybook/react'
import Modal, { ModalProps } from './Modal.component'
import useModal from './Modal.hooks'
import Button from 'components/actions/Button'
import { modal } from './Modal.tools'

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
    position: 'center',
    title: 'Title',
    name: 'global',
    actions: [
      { content: 'Reset', color: 'info' },
      { content: 'Save', color: 'success' },
    ],
  },
}
