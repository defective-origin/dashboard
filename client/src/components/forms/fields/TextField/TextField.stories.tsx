import { Meta, StoryObj, field, params } from 'storybook'
import TextField from './TextField.component'
import Actions from 'components/layouts/Actions'
import Icon from 'components/views/Icon'

const meta: Meta<typeof TextField> = {
  title: 'Components/Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    className: field.string(),
    required: field.boolean(),
    disabled: field.boolean(),
  },
}

export default meta

type Story = StoryObj<typeof TextField>

export const Demo: Story = {
  parameters: params('TextField'),
  args: {
    label: 'Label',
    init: 'Some value',
    help: 'help text',
    placeholder: 'Enter text...',
    start: <Icon v='search' size='sm' />,
    end: (
      <Actions menu>
        <Actions.Button start='person' />
        <Actions.Button start='beenhere' />
        <Actions.Button start='payments' />
      </Actions>
    ),
    multiline: false,
    required: false,
    disabled: false,
    checkOnBlur: true,
    checkOnChange: true,
    rules: [
      value => value.length > 5 && 'TEXT CANNOT BE MORE THEN 5 CHARS',
    ],
    onChange: console.log,
  },
}
