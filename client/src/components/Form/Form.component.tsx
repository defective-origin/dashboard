import React from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Block, { BlockProps } from 'components/Block'
import Section from 'components/Section'
import Actions, { ActionItem } from 'components/Actions'
import Alert from 'components/Alert'
import Alerts, { AlertItem } from 'components/Alerts'
import Field from 'components/Field'
import Aside from 'components/Aside'
import Content from 'components/Content'
import Footer from 'components/Footer'
import Header from 'components/Header'

// ---| self |---
import css from './Form.module.scss'
import FormButton from './FormButton'
import { FormContext, FormGroupValue, FormOptions, useForm } from './Form.context'

export type FormProps = FormOptions<FormGroupValue> & BlockProps & {
  className?: string
  children?: React.ReactNode
  alerts?: AlertItem[]
  actions?: ActionItem[]
}

// TODO: update documentation
// TODO: https://developer.mozilla.org/en-US/docs/Web/API/FormData
/**
 * Component description.
 *
 * How to use
 * @example
 * const log = (value) => {
 *   console.log(value)
 *   // field = some nested state value
 *   //
 *   // store = {
 *   //   text: 'text',
 *   //   number: 0,
 *   //   radio: false,
 *   //   switch: false,
 *   //   checkbox: 'checkbox',
 *   //   select: 'value0',
 *   //   slider: 0,
 *   //
 *   //   group: {
 *   //     text: 'text',
 *   //     number: 0,
 *   //     radio: false,
 *   //     switch: false,
 *   //     checkbox: 'checkbox',
 *   //     select: 'value0',
 *   //     slider: 0,
 *   //   }
 *   // }
 *   //
 *   // e = event
 * }
 *
 * const MESSAGES = [
 *   { color: 'success', content: 'success' },
 *   { color: 'error', content: 'error' },
 *   { color: 'warning', content: 'warning' },
 *   { color: 'info', content: 'info' },
 *   { color: 'primary', content: 'primary' },
 *   { color: 'secondary', content: 'secondary' },
 *   { color: 'bg', content: 'bg' },
 * ]
 *
 * const VALUE = {
 *   text: 'text',
 *   number: 0,
 *   radio: false,
 *   switch: false,
 *   checkbox: 'checkbox',
 *   select: 'value0',
 *   slider: 0,
 *
 *   group: {
 *     text: 'text',
 *     number: 0,
 *     radio: false,
 *     switch: false,
 *     checkbox: 'checkbox',
 *     select: 'value0',
 *     slider: 0,
 *   },
 *
 *   list: {
 *     text: 'text',
 *     number: 0,
 *     radio: false,
 *     switch: false,
 *     checkbox: 'checkbox',
 *     select: 'value0',
 *     slider: 0,
 *   }
 * }
 *
 * const GROUP_ITEMS = [
 *    { v: 'text', name: 'text', value: 'default value' },
 *    { v: 'number', name: 'number', value: 666 },
 *    { v: 'radio', name: 'radio', value: false },
 *    { v: 'switch', name: 'switch', value: false },
 *    { v: 'checkbox', name: 'checkbox', value: 'checkbox', checked: true },
 *    { v: 'select', name: 'select', value: 'value1' },
 *    { v: 'slider', name: 'slider', value: 666 },
 * ]
 *
 * const LIST_ITEMS = [
 *    { v: 'text', name: 'item', value: 'default value' },
 *    { v: 'number', name: 'item', value: 666 },
 *    { v: 'radio', name: 'item', value: false },
 *    { v: 'switch', name: 'item', value: false },
 *    { v: 'checkbox', name: 'item', value: 'checkbox', checked: true },
 *    { v: 'select', name: 'item', value: 'value1' },
 *    { v: 'slider', name: 'item', value: 666 },
 * ]
 *
 * const ITEMS = [
 *   { v: 'text', name: 'text', value: 'default value' },
 *   { v: 'number', name: 'number', value: 666 },
 *   { v: 'radio', name: 'radio', value: false },
 *   { v: 'switch', name: 'switch', value: false },
 *   { v: 'checkbox', name: 'checkbox', value: 'checkbox', checked: true },
 *   { v: 'select', name: 'select', value: 'value1' },
 *   { v: 'slider', name: 'slider', value: 666 },
 *
 *   { v: 'group', name: 'group', items: GROUP_ITEMS },
 *   { v: 'list', name: 'list', items: LIST_ITEMS }
 * ]
 *
 * const ALERTS = [
 *   { color: 'success', content: 'success' },
 *   { color: 'error', content: 'error' },
 *   { color: 'warning', content: 'warning' },
 *   { color: 'info', content: 'info' },
 *   { color: 'primary', content: 'primary' },
 *   { color: 'secondary', content: 'secondary' },
 * ]
 *
 * const ACTIONS = [
 *   { v: 'button', content: 'submit', type: 'submit' },
 *   { v: 'button', content: 'reset', type: 'reset' },
 * ]
 *
 *   const SELECT_OPTIONS = [
 *     { value: 'value0', children: 'FIRST' },
 *     { value: 'value1', children: 'SECOND' },
 *     { value: 'value2', children: 'THIRD' },
 *   ]
 *
 * // Manual approach
 *   <Form name='FORM_NAME' onSubmit={log} onChange={log} onReset={log} padding='xxl'>
 *     <Form.Alerts items={ALERTS} g='xs'>
 *       <Form.Alert color='success' content='success' />
 *       <Form.Alert color='info' content='info' />
 *       <Form.Alert color='warning' content='warning' />
 *       <Form.Alert color='error' content='error' />
 *     </Form.Alerts>
 *
 *     <Form.Content g='xs'>
 *       <Form.Actions items={ACTIONS} />
 *       <Form.Actions>
 *         FORM ACTIONS
 *         <Form.Reset content='Reset' />
 *         <Form.Submit content='Submit' />
 *       </Form.Actions>
 *
 *       <Form.Block className={_className} direction='x' g='xs'>
 *         <Form.Field.Checkbox name='with' label='with' value='checkbox' messages={MESSAGES} checked onChange={log} />
 *         <Form.Field.Checkbox name='without' label='without' messages={MESSAGES} checked onChange={log} />
 *       </Form.Block>
 *
 *       <Form.Block className={_className} direction='x' g='xs'>
 *         <Form.Field.Radio name='radio' label='radio 1' value={1} messages={MESSAGES} onChange={log} />
 *         <Form.Field.Radio name='radio' label='radio 2' value={2} messages={MESSAGES} onChange={log} checked />
 *       </Form.Block>
 *
 *       <Form.Block className={_className} direction='x' g='xs'>
 *         <Form.Field.Switch name='switch1' label='switch1' messages={MESSAGES} onChange={log} />
 *         <Form.Field.Switch name='switch2' label='switch2' messages={MESSAGES} onChange={log} />
 *       </Form.Block>
 *
 *       <Form.Block className={_className} direction='x' g='xs'>
 *         <Form.Field.Slider name='slider' label='slider' value={75} messages={MESSAGES} onChange={log} />
 *         <Form.Field.Number name='number' label='number' value={75} messages={MESSAGES} onChange={log} />
 *       </Form.Block>
 *
 *       <Form.Block className={_className} direction='x' g='xs'>
 *         <Form.Field.Select name='select' label='select' value='value0' messages={MESSAGES} onChange={log} items={SELECT_OPTIONS} />
 *         <Form.Field.Text name='text' label='text' value='value' messages={MESSAGES} onChange={log} />
 *       </Form.Block>
 *
 *       <Form.Field.Group name='group' label='group' messages={MESSAGES} onChange={log}>
 *         <Form.Actions>
 *           GROUP ACTIONS
 *           <Form.Reset content='Reset' />
 *           <Form.Submit content='Submit' />
 *         </Form.Actions>
 *
 *         <Form.Content direction='x' g='xs'>
 *           <Form.Field.Radio name='group-radio' label='radio' value={true} messages={MESSAGES} onChange={log} />
 *           <Form.Field.Switch name='group-switch' label='switch' value={true} messages={MESSAGES} onChange={log} />
 *           <Form.Field.Checkbox name='group-checkbox' label='checkbox' value='checkbox' messages={MESSAGES} checked onChange={log} />
 *           <Form.Field.Slider name='group-slider' label='slider' value={50} messages={MESSAGES} onChange={log} />
 *           <Form.Field.Select name='group-select' label='select' value='value0' messages={MESSAGES} onChange={log} items={SELECT_OPTIONS} />
 *           <Form.Field.Text name='group-text' label='text' value='value' messages={MESSAGES} onChange={log} />
 *           <Form.Field.Number name='group-number' label='number' value={50} messages={MESSAGES} onChange={log} />
 *         </Form.Content>
 *       </Form.Field.Group>
 *
 *       <Form.Field.Group name='list' label='list' messages={MESSAGES} onChange={log} list>
 *         <Form.Actions>
 *           LIST ACTIONS
 *           <Form.Reset content='Reset' />
 *           <Form.Submit content='Submit' />
 *         </Form.Actions>
 *
 *         <Form.Content direction='x' g='xs'>
 *           <Form.Field.Radio name='item_0' label='radio' value={true} messages={MESSAGES} onChange={log} />
 *           <Form.Field.Switch name='item_1' label='switch' value={true} messages={MESSAGES} onChange={log} />
 *           <Form.Field.Checkbox name='item_2' label='checkbox' value='checkbox' messages={MESSAGES} checked onChange={log} />
 *           <Form.Field.Slider name='item_3' label='slider' value={25} messages={MESSAGES} onChange={log} />
 *           <Form.Field.Select name='item_4' label='select' value='value0' messages={MESSAGES} items={SELECT_OPTIONS} onChange={log} />
 *           <Form.Field.Text name='item_5' label='text' value='value' messages={MESSAGES} onChange={log} />
 *           <Form.Field.Number name='item_6' label='number' value={25} messages={MESSAGES} onChange={log} />
 *         </Form.Content>
 *       </Form.Field.Group>
 *     </Form.Content>
 *
 *     <Form.Actions>
 *       GLOBAL FORM ACTIONS
 *       <Form.Actions.Button type='reset' content='Reset' />
 *       <Form.Actions.Button type='submit' content='Submit' />
 *     </Form.Actions>
 *   </Form>
 *
 * // Config programming approach
 * <Form
 *   value={VALUE}
 *   items={ITEMS}
 *   alerts={ALERTS}
 *   actions={ACTIONS}
 *   onSubmit={log}
 *   onReset={log}
 * />
 *
 * // Mixed approach
 * <Form value={VALUE} items={ITEMS} alerts={ALERTS} actions={ACTIONS} onSubmit={log} onReset={log}>
 *   <Form.Alerts items={ALERTS}>
 *     <Form.Alert color='success' content='success' />
 *     <Form.Alert color='info' content='info' />
 *     <Form.Alert color='warning' content='warning' />
 *     <Form.Alert color='error' content='error' />
 *   </Form.Alerts>
 *
 *   // form actions
 *   <Form.Actions items={ACTIONS}>
 *     <Form.Actions.Button type='reset' content='Reset' />
 *     <Form.Actions.Button type='submit' content='Submit' />
 *   </Form.Actions>
 *
 *   <Form.Content>
 *     <Form.Field.Text name='text' label='text' value='value' messages={MESSAGES} />
 *     <Form.Field.Number name='number' label='number' value={0} messages={MESSAGES} />
 *     <Form.Field.Radio name='radio' label='radio' value={true} messages={MESSAGES} />
 *     <Form.Field.Switch name='switch' label='switch' value={true} messages={MESSAGES} />
 *     <Form.Field.Checkbox name='checkbox' label='checkbox' value='checkbox' messages={MESSAGES} checked />
 *     <Form.Field.Select name='select' label='select' value='value0' messages={MESSAGES} />
 *     <Form.Field.Slider name='slider' label='slider' value={0} messages={MESSAGES} />
 *
 *     // form actions
 *     <Form.Actions items={ACTIONS} />
 *     <Form.Alerts items={ALERTS} />
 *
 *     <Form.Field.Group name='group' label='group' value={VALUE.group} items={GROUP_ITEMS} messages={MESSAGES}>
 *       <Form.Field.Text name='text' label='text' value='value' messages={MESSAGES} />
 *       <Form.Field.Number name='number' label='number' value={0} messages={MESSAGES} />
 *       <Form.Field.Radio name='radio' label='radio' value={true} messages={MESSAGES} />
 *       <Form.Field.Switch name='switch' label='switch' value={true} messages={MESSAGES} />
 *       <Form.Field.Checkbox name='checkbox' label='checkbox' value='checkbox' messages={MESSAGES} checked />
 *       <Form.Field.Select name='select' label='select' value='value0' messages={MESSAGES} />
 *       <Form.Field.Slider name='slider' label='slider' value={0} messages={MESSAGES} />
 *
 *       // group actions
 *       <Form.Actions>
 *         <Form.Actions.Button type='reset' content='Reset' />
 *         <Form.Actions.Button type='submit' content='Submit' />
 *       </Form.Actions>
 *     </Form.Field.Group>
 *
 *     <Form.Field.Group name='list' label='list' value={VALUE.list} items={LIST_ITEMS} messages={MESSAGES} list>
 *       <Form.Field.Text name='item' label='text' value='value' messages={MESSAGES} />
 *       <Form.Field.Number name='item' label='number' value={0} messages={MESSAGES} />
 *       <Form.Field.Radio name='item' label='radio' value={true} messages={MESSAGES} />
 *       <Form.Field.Switch name='item' label='switch' value={true} messages={MESSAGES} />
 *       <Form.Field.Checkbox name='item' label='checkbox' value='checkbox' messages={MESSAGES} checked />
 *       <Form.Field.Select name='item' label='select' value='value0' messages={MESSAGES} />
 *       <Form.Field.Slider name='item' label='slider' value={0} messages={MESSAGES} />
 *
 *       // list actions
 *       <Form.Actions>
 *         <Form.Actions.Button type='reset' content='Reset' />
 *         <Form.Actions.Button type='submit' content='Submit' />
 *       </Form.Actions>
 *     </Form.Field.Group>
 *   </Form.Content>
 * </Form>
 */
export function Form(props: FormProps): JSX.Element {
  const { value = {}, name, alerts, actions, onSubmit, onReset, onChange, children, className, ...otherProps } = props
  const _className = cn(css.Form, className)
  const field = useForm({ value, name, onChange, onReset, onSubmit })

  return (
    <FormContext.Provider value={field} >
      <Block as='form' className={_className} onSubmit={field.submit} onReset={field.reset} g='xs' {...otherProps}>
        {alerts && <Alerts items={alerts} />}

        {children}

        {actions && <Actions items={actions} />}
      </Block>
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'

export default react.attachComponents(Form, {
  Section,
  Actions,
  Header,
  Content,
  Footer,
  Aside,
  Block,
  Alert,
  Alerts,
  Field,
  Reset: FormButton.Reset,
  Submit: FormButton.Submit,
})
