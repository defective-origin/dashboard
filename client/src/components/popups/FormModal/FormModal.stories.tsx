/* eslint-disable no-restricted-imports */
import { field, params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import FormModal, { FormModalProps } from './FormModal.component'
import Field from 'components/forms/fields'
import Layout from 'components/layouts/Layout'

const meta: Meta<typeof FormModal> = {
  component: FormModal,
  title: 'Screens/Forms/FormModal',
  tags: ['autodocs'],
  argTypes: {
    name: field.string(),
    className: field.string(),
    children: field.reactNode(),
  },
}

export default meta

type Story = StoryObj<typeof FormModal>

export const Demo: Story = {
  parameters: params('FormModal'),
  render: () => {
    const SELECT_ITEMS = [
      { value: 'value0', children: 'FIRST' },
      { value: 'value1', children: 'SECOND' },
      { value: 'value2', children: 'THIRD' },
    ]

    return (
      <FormModal name='board-settings' title='Settings' open>
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
      </FormModal>
    )
  },
}
