/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import ModalForm, { ModalFormProps } from './ModalForm.component'
import Field from 'components/Field'
import Layout from 'components/Layout'

const meta: Meta<typeof ModalForm> = {
  component: ModalForm,
  title: 'Screens/FORMS/ModalForm',
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
    const SELECT_OPTIONS = [
      { value: 'value0', children: 'FIRST' },
      { value: 'value1', children: 'SECOND' },
      { value: 'value2', children: 'THIRD' },
    ]

    return (
      <ModalForm name='board-settings' title='Settings' open>
        <Layout v='board' columns={3} g='sm'>
          <Field.Radio name='radio' label='Radio' value={true} />
          <Field.Switch name='switch' label='Switch' value={true} />
          <Field.Checkbox name='checkbox' label='Checkbox' value='checkbox' checked />
        </Layout>

        <Layout v='board' columns={2} g='sm'>
          <Field.Text name='text' label='Text' value='value' message='Help text' />
          <Field.Number name='number' label='Number' value={50} message='Help text' />
        </Layout>

        <Field.Slider name='slider' label='Slider' value={50} />
        <Field.Select name='select' label='Select' value='value0' message='Help text' items={SELECT_OPTIONS} />
        <Field.Text name='text-multiline' label='Text multiline' value='value' message='Help text' multiline />
      </ModalForm>
    )
  },
}
