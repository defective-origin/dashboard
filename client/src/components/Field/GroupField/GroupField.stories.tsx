/* eslint-disable no-restricted-imports */
import { params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import GroupField from './GroupField.component'
import Field from '../Field.component'

const meta: Meta<typeof GroupField> = {
  title: 'Components/FORM/GroupField',
  component: GroupField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof GroupField>

const SELECT_OPTIONS = [
  { value: 'value0', children: 'FIRST' },
  { value: 'value1', children: 'SECOND' },
  { value: 'value2', children: 'THIRD' },
]
const log = (...a: unknown[]) => console.log(...a)

export const Demo: Story = {
  parameters: params('GroupField'),
  render: (props) => (
    <>
      <Field.Group v='row' g='xs' {...props}>
        <Field.Radio name='group-radio' label='Radio' value={true} onChange={log} />
        <Field.Switch name='group-switch' label='Switch' value={true} onChange={log} />
        <Field.Checkbox name='group-checkbox' label='Checkbox' value='checkbox' checked onChange={log} />
        <Field.Slider name='group-slider' label='Slider' value={50} onChange={log} v='start' />
      </Field.Group>

      <Field.Group v='row' g='xs' {...props}>
        <Field.Select name='group-select' label='Select' value='value0' message='Help text' onChange={log} items={SELECT_OPTIONS} />
        <Field.Text name='group-text' label='Text' value='value' message='Help text' onChange={log} />
        <Field.Number name='group-number' label='Number' value={50} message='Help text' onChange={log} />
      </Field.Group>
    </>
  ),
}
