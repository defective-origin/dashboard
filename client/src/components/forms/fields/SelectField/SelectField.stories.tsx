import { Meta, StoryObj, params } from 'storybook'
import SelectField from './SelectField.component'
import SelectFieldItem from './SelectFieldItem'
import Icon from 'components/views/Icon'

const meta: Meta<typeof SelectField> = {
  title: 'Components/Forms/SelectField',
  component: SelectField,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof SelectField>

export const Demo: Story = {
  parameters: params('SelectField'),
  args: {
    disabled: false,
    required: false,
    label: 'Label',
    init: 'value0',
    help: 'help text',
    children: [
      <SelectFieldItem value='value0' content='FIRST' start={<Icon v='2k' />} end={<Icon v='2k' />} />,
      <SelectFieldItem value='value1' content='SECOND' start={<Icon v='4k' />} end={<Icon v='4k' />} />,
      <SelectFieldItem value='value2' content='THIRD' start={<Icon v='8k' />} end={<Icon v='8k' />} />,
    ],
  },
}
