/* eslint-disable no-restricted-imports */
import { params } from '../../../../.storybook/tool'
import type { Meta, StoryObj } from '@storybook/react'
import GroupField from './GroupField.component'
import { TextProps } from 'components/Text'
import TextField from '../TextField'
import SelectField from '../SelectField'
import CheckboxField from '../CheckboxField'
import NumberField from '../NumberField'
import RadioField from '../RadioField'
import SliderField from '../SliderField'
import SwitchField from '../SwitchField'

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
      <GroupField v='row' g='xs' {...props}>
        <RadioField name='group-radio' label='radio' value={true} onChange={log} />
        <SwitchField name='group-switch' label='switch' value={true} onChange={log} />
        <CheckboxField name='group-checkbox' label='checkbox' value='checkbox' checked onChange={log} />
        <SliderField name='group-slider' label='slider' value={50} onChange={log} v='start' />
      </GroupField>

      <GroupField v='row' g='xs' {...props}>
        <SelectField name='group-select' label='select' value='value0' message='Help text' onChange={log} items={SELECT_OPTIONS} />
        <TextField name='group-text' label='text' value='value' message='Help text' onChange={log} />
        <NumberField name='group-number' label='number' value={50} message='Help text' onChange={log} />
      </GroupField>
    </>
  ),
}
