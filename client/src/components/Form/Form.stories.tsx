import { Title, Subtitle, Primary, Controls } from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'
import Form from './Form.component'
import Text, { TextProps } from 'components/Text'
import { AlertItem } from 'components/Alerts'
import { ActionItem } from 'components/Actions'

const meta: Meta<typeof Form> = {
  title: 'Components/FORM/Form',
  component: Form,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Form>
const MESSAGES: TextProps[] = [
  { color: 'success', content: 'success' },
  { color: 'error', content: 'error' },
  { color: 'warning', content: 'warning' },
  { color: 'info', content: 'info' },
  { color: 'primary', content: 'primary' },
  { color: 'secondary', content: 'secondary' },
]

const ALERTS: AlertItem[] = [
  { color: 'success', content: 'success' },
  { color: 'info', content: 'info' },
  { color: 'warning', content: 'warning' },
  { color: 'error', content: 'error' },
]

const ACTIONS: ActionItem[] = [
  { v: 'button', content: 'submit', type: 'submit', color: 'info', size: 'xs' },
  { v: 'button', content: 'reset', type: 'reset', color: 'success', size: 'xs' },
]

const SELECT_OPTIONS = [
  { value: 'value0', children: 'FIRST' },
  { value: 'value1', children: 'SECOND' },
  { value: 'value2', children: 'THIRD' },
]

const formLog = (...a: unknown[]) => console.log('Form', ...a)
const log = (...a: unknown[]) => console.log(...a)

export const Demo: Story = {
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
  render: () => (
    <Form name='FORM_NAME' onSubmit={formLog} onChange={formLog} onReset={log} p='xxl'>
      <Form.Alerts items={ALERTS} g='xs'>
        <Form.Alert color='success' content='success' />
        <Form.Alert color='info' content='info' />
        <Form.Alert color='warning' content='warning' />
        <Form.Alert color='error' content='error' />
      </Form.Alerts>

      <Form.Content g='xs'>
        <Text content='FORM ACTIONS' />
        <Form.Actions items={ACTIONS} g='xs' />

        <Form.Block v='x' g='xs'>
          <Form.Field.Checkbox name='with' label='with' value='checkbox' messages={MESSAGES} checked onChange={log} />
          <Form.Field.Checkbox name='without' label='without' messages={MESSAGES} checked onChange={log} />
        </Form.Block>

        <Form.Block v='x' g='xs'>
          <Form.Field.Radio name='radio' label='radio 1' value={1} messages={MESSAGES} onChange={log} checked />
          <Form.Field.Radio name='radio' label='radio 2' value={2} messages={MESSAGES} onChange={log} />
        </Form.Block>

        <Form.Block v='x' g='xs'>
          <Form.Field.Switch name='switch1' label='switch1' messages={MESSAGES} onChange={log} />
          <Form.Field.Switch name='switch2' label='switch2' messages={MESSAGES} onChange={log} />
        </Form.Block>

        <Form.Block v='x' g='xs'>
          <Form.Field.Slider name='slider' label='slider' value={75} messages={MESSAGES} onChange={log} />
          <Form.Field.Number name='number' label='number' value={75} messages={MESSAGES} onChange={log} />
        </Form.Block>

        <Form.Block v='x' g='xs'>
          <Form.Field.Select name='select' label='select' value='value0' messages={MESSAGES} onChange={log} items={SELECT_OPTIONS} />
          <Form.Field.Text name='text' label='text' value='value' messages={MESSAGES} onChange={log} />
        </Form.Block>

        <Form.Field.Group name='group' label='group' messages={MESSAGES} onChange={log}>
          <Form.Actions g='xs'>
            <Text content='GROUP ACTIONS' />
            <Form.Reset content='Reset' color='info' size='xs' />
            <Form.Submit content='Submit' color='success' size='xs' />
          </Form.Actions>

          <Form.Content v='row' g='xs'>
            <Form.Field.Radio name='group-radio' label='radio' value={true} messages={MESSAGES} onChange={log} />
            <Form.Field.Switch name='group-switch' label='switch' value={true} messages={MESSAGES} onChange={log} />
            <Form.Field.Checkbox name='group-checkbox' label='checkbox' value='checkbox' messages={MESSAGES} checked onChange={log} />
            <Form.Field.Slider name='group-slider' label='slider' value={50} messages={MESSAGES} onChange={log} />
            <Form.Field.Select name='group-select' label='select' value='value0' messages={MESSAGES} onChange={log} items={SELECT_OPTIONS} />
            <Form.Field.Text name='group-text' label='text' value='value' messages={MESSAGES} onChange={log} />
            <Form.Field.Number name='group-number' label='number' value={50} messages={MESSAGES} onChange={log} />
          </Form.Content>
        </Form.Field.Group>

        <Form.Field.Group name='list' label='list' messages={MESSAGES} onChange={log} list>
          <Form.Actions g='xs'>
            <Text content='LIST ACTIONS' />
            <Form.Reset content='Reset' color='info' size='xs' />
            <Form.Submit content='Submit' color='success' size='xs' />
          </Form.Actions>

          <Form.Content v='row' g='xs'>
            <Form.Field.Radio name='item_0' label='radio' value={true} messages={MESSAGES} onChange={log} />
            <Form.Field.Switch name='item_1' label='switch' value={true} messages={MESSAGES} onChange={log} />
            <Form.Field.Checkbox name='item_2' label='checkbox' value='checkbox' messages={MESSAGES} checked onChange={log} />
            <Form.Field.Slider name='item_3' label='slider' value={25} messages={MESSAGES} onChange={log} />
            <Form.Field.Select name='item_4' label='select' value='value0' messages={MESSAGES} items={SELECT_OPTIONS} onChange={log} />
            <Form.Field.Text name='item_5' label='text' value='value' messages={MESSAGES} onChange={log} />
            <Form.Field.Number name='item_6' label='number' value={25} messages={MESSAGES} onChange={log} />
          </Form.Content>
        </Form.Field.Group>
      </Form.Content>

      <Form.Actions g='xs'>
        <Text content='GLOBAL FORM ACTIONS' />
        <Form.Actions.Button type='reset' content='Reset' color='info' size='xs' />
        <Form.Actions.Button type='submit' content='Submit' color='success' size='xs' />
      </Form.Actions>
    </Form>
  ),
}
