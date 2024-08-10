/* eslint-disable no-restricted-imports */
import { field, params } from '../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import ModalForm, { ModalFormProps } from './ModalForm.component'
import Field from 'components/fields'
import Layout from 'components/Layout'

const meta: Meta<typeof ModalForm> = {
  component: ModalForm,
  title: 'Screens/Forms/ModalForm',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof ModalForm>

export const Demo: Story = {
  parameters: params('ModalForm'),
  render: () => {
    const SELECT_ITEMS = [
      { value: 'value0', children: 'FIRST' },
      { value: 'value1', children: 'SECOND' },
      { value: 'value2', children: 'THIRD' },
    ]

    return (
      <ModalForm name='board-settings' title='Settings' open>
        <Layout v='board' columns={3} g='sm'>
          <Field.Radio path='radio' label='Radio' value={true} />
          <Field.Switch path='switch' label='Switch' value={true} />
          <Field.Checkbox path='checkbox' label='Checkbox' value='checkbox' checked />
        </Layout>

        <Layout v='board' columns={2} g='sm'>
          <Field.Text path='text' label='Text' value='value' help='Help text' />
          <Field.Number path='number' label='Number' value={50} help='Help text' />
        </Layout>

        <Field.Slider path='slider' label='Slider' value={50} />
        <Field.Select path='select' label='Select' value='value0' help='Help text' items={SELECT_ITEMS} />
        <Field.Text path='text-multiline' label='Text multiline' value='value' help='Help text' multiline />
      </ModalForm>
    )
  },
}
