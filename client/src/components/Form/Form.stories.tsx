import { params } from '../../../.storybook/tool'
import { Title, Subtitle, Primary, Controls, Stories } from '@storybook/blocks'
import type { Meta, StoryObj } from '@storybook/react'
import Form from './Form.component'
import Text from 'components/Text'
import Actions from 'components/Actions'
import Layout from 'components/Layout'
import Field from 'components/fields'
import { useWatch } from './Form.hook'

const WatchField = ({ path }: { path: string | string[] }) => {
  const field = useWatch(path)

  return (
    <Layout g='xxs'>
      <Text size='xxs' content={`Fields: ${JSON.stringify(path)}`} />
      <Text size='xxs' content={`value: ${JSON.stringify(field?.value)}`} color='info' />

      {!!Object.keys(field?.errors ?? []).length && (
        <Text size='xxs' content={`errors: ${JSON.stringify(field?.errors)}`} color='error' />
      )}
    </Layout>
  )
}

const meta: Meta<typeof Form> = {
  title: 'Components/Forms/Form',
  component: Form,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Form>

const TEXT_RULES = [
  (value: string) => value.length > 5 && 'TEXT CANNOT BE MORE THEN 5 CHARS',
]

const SELECT_ITEMS = [
  { value: 'value0', children: 'FIRST' },
  { value: 'value1', children: 'SECOND' },
  { value: 'value2', children: 'THIRD' },
]

const TOGGLING_ITEMS = [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }]

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
          <Stories includePrimary={false} />
        </>
      ),
    },
  },
  render: () => (
    <Form onSubmit={formLog} onChange={formLog} onReset={log} p='xxl' checkOnSubmit>
      <Layout g='xs'>
        <WatchField path='slider' />
        <Actions g='xs'>
          <Text content='GLOBAL FORM ACTIONS' />
          <Actions.Button type='reset' content='Reset' color='info' size='xs' />
          <Actions.Button type='submit' content='Submit' color='success' size='xs' />
        </Actions>

        <Actions g='xs'>
          <Text content='FORM ACTIONS' />
          <Form.Reset content='Reset' color='info' size='xs' />
          <Form.Submit content='Submit' color='success' size='xs' />
        </Actions>

        <Layout g='xs' columns={4}>
          <Field.Slider path='slider' label='Slider' init={75} onChange={log} />
          <Field.Number path='number' label='Number' init={75} help='Help text' onChange={log} />

          <Field.Select path='select' label='Select' init='value0' help='Help text' onChange={log} items={SELECT_ITEMS} />
          <Field.Text path='text' label='Text' init='value' help='Help text' onChange={log} rules={TEXT_RULES} checkOnChange />
        </Layout>

        <Layout g='xs' columns={6}>
          <Field.Checkbox path='with' label='With Value' init='checkbox' checked onChange={log} />
          <Field.Checkbox path='without' label='Without Value' checked onChange={log} />

          <Field.Switch path='switch1' label='Switch1' onChange={log} />
          <Field.Switch path='switch2' label='Switch2' onChange={log} />

          <Field.Radio path='radio1' label='Radio1' init={1} onChange={log} />
          <Field.Radio path='radio2' label='Radio2' init={2} onChange={log} checked />
        </Layout>

        <Layout g='xs' columns={2}>
          <Field.RadioGroup path='radio-group' label='Radio Group'
            init='b'
            items={TOGGLING_ITEMS}
            columns={TOGGLING_ITEMS.length}
          />
          <Field.CheckboxList path='checkbox-list' label='Checkbox List'
            init={['b']}
            items={TOGGLING_ITEMS}
            columns={TOGGLING_ITEMS.length}
          />
        </Layout>

        <Layout g='xs'>
          <Actions g='xs'>
            <Text content='GROUP' />
            <Form.Reset path='group' content='Reset' color='info' size='xs' />
            <Form.Submit path='group' content='Submit' color='success' size='xs' />
          </Actions>

          <Layout columns={7} g='xs'>
            <Field.Radio path='group.radio' label='Radio' init='radio value' onChange={log} />
            <Field.Switch path='group.switch' label='Switch' init={true} onChange={log} />
            <Field.Checkbox path='group.checkbox' label='Checkbox' init='checkbox' checked onChange={log} />
            <Field.Slider path='group.slider' label='Slider' init={50} onChange={log} />
            <Field.Select path='group.select' label='Select' init='value1' help='Help text' onChange={log} items={SELECT_ITEMS} />
            <Field.Text path='group.text' label='Text' init='value' help='Help text' rules={TEXT_RULES} checkOnChange onChange={log} />
            <Field.Number path='group.number' label='Number' init={50} help='Help text' onChange={log} />
          </Layout>
        </Layout>

        <Layout g='xs'>
          <Actions g='xs'>
            <Text content='LIST' />
            <Form.Reset path='list' content='Reset' color='info' size='xs' />
            <Form.Submit path='list' content='Submit' color='success' size='xs' />
          </Actions>

          <Layout columns={7} g='xs'>
            <Field.Radio path='list.0' label='Radio' init='radio value' onChange={log} />
            <Field.Switch path='list.1' label='Switch' init={true} onChange={log} />
            <Field.Checkbox path='list.2' label='Checkbox' init='checkbox' checked onChange={log} />
            <Field.Slider path='list.3' label='Slider' init={25} onChange={log} />
            <Field.Select path='list.4' label='Select' init='value2' help='Help text' items={SELECT_ITEMS} onChange={log} />
            <Field.Text path='list.5' label='Text' init='value' help='Help text' rules={TEXT_RULES} checkOnChange onChange={log} />
            <Field.Number path='list.6' label='Number' init={25} help='Help text' onChange={log} />
          </Layout>
        </Layout>
      </Layout>
    </Form>
  ),
}

export const InitializeViaForm: Story = {
  parameters: params('There is ability to initialize all form values via `init` prop in `Form` component'),
  render: () => (
    <Form init={{
      radio1: 'radio value 1',
      radio2: undefined,
      switch: true,
      checkbox1: 'checkbox',
      checkbox2: false,
      checkbox3: undefined,
      group: {
        slider: 75,
        select: 'value1',
        text: 'value',
        number: 50,
      },
    }} onSubmit={formLog} onChange={formLog} onReset={log} p='xxl'>
      <Layout g='xs'>
        <Actions g='xs'>
          <Text content='GLOBAL FORM ACTIONS' />
          <Actions.Button type='reset' content='Reset' color='info' size='xs' />
          <Actions.Button type='submit' content='Submit' color='success' size='xs' />
        </Actions>

        <Layout columns={5} g='xs'>
          <Field.Radio path='radio1' label='Radio 1' init='radio value 1' onChange={log} />
          <Field.Radio path='radio2' label='Radio 2' init='radio value 2' onChange={log} />
          <Field.Checkbox path='checkbox1' label='Checkbox 1' init='checkbox' onChange={log} />
          <Field.Checkbox path='checkbox2' label='Checkbox 2' onChange={log} />
          <Field.Checkbox path='checkbox3' label='Checkbox 3' onChange={log} />
          <Field.Switch path='switch' label='Switch' onChange={log} />
          <Field.Slider path='group.slider' label='Slider' onChange={log} />
          <Field.Select path='group.select' label='Select' help='Help text' onChange={log} items={SELECT_ITEMS} />
          <Field.Text path='group.text' label='Text' help='Help text' rules={TEXT_RULES} checkOnChange onChange={log} />
          <Field.Number path='group.number' label='Number' help='Help text' onChange={log} required />
        </Layout>
      </Layout>
    </Form>
  ),
}

export const FormActions: Story = {
  parameters: params(`
  There is several type of form reset and submit actions.   
  __Global__ form actions (native and custom) which works with all form values.  
  __Custom__ form actions which allows to work with one value or grouped value. Prop __path__ should be set for form action. 
  `),
  render: () => (
    <Form onSubmit={formLog} onChange={formLog} onReset={log} p='xxl'>
      <Layout g='xs'>
        <Actions g='xs'>
          <Text content='GLOBAL FORM ACTIONS' />
          <Actions.Button type='reset' content='Reset' color='info' size='xs' />
          <Actions.Button type='submit' content='Submit' color='success' size='xs' />
        </Actions>

        <Actions g='xs'>
          <Text content='FORM ACTIONS' />
          <Form.Reset content='Reset' color='info' size='xs' />
          <Form.Submit content='Submit' color='success' size='xs' />
        </Actions>

        <Field.Slider path='slider' label='Slider' init={75} onChange={log} />

        <Layout g='xs'>
          <Actions g='xs'>
            <Text content='GROUP' />
            <Form.Reset path='group' content='Reset' color='info' size='xs' />
            <Form.Submit path='group' content='Submit' color='success' size='xs' />
          </Actions>

          <Field.Slider path='group.slider' label='Slider' init={50} onChange={log} />
        </Layout>

        <Layout g='xs'>
          <Actions g='xs'>
            <Text content='LIST' />
            <Form.Reset path='list' content='Reset' color='info' size='xs' />
            <Form.Submit path='list' content='Submit' color='success' size='xs' />
          </Actions>

          <Field.Slider path='list.0' label='Slider' init={25} onChange={log} />
        </Layout>
      </Layout>
    </Form>
  ),
}

export const WatchFields: Story = {
  parameters: params(`
  Allows to subscribe on __field__ or __fields__ change.   
  If several fields is passed then returns whole form value \`useWatch\` otherwise field value.
  `),
  render: () => (
    <Form onSubmit={formLog} onChange={formLog} onReset={log} p='xxl'>
      <Layout g='xs' width={400}>
        <Actions.Button type='reset' content='Reset' color='info' size='xs' />

        <Field.Slider path='slider' label='Slider' init={50} onChange={log} />
        <Field.Text path='group.text' label='Text' help='Help text' rules={TEXT_RULES} init='value' checkOnChange onChange={log} />
        <WatchField path='group.text' />
        <WatchField path={['group.text', 'slider']} />
      </Layout>
    </Form>
  ),
}
