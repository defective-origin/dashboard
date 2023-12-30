import React, { useCallback } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Block from 'components/Block'
import Section from 'components/Section'
import Actions, { Action } from 'components/Actions'
import Alert, { AlertProps } from 'components/Alert'
import Field from 'components/Field'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './Form.module.scss'
import FormButton from './FormButton'
import FormGroup from './FormGroup'
import { FormContext, FormEventContext, FormGroupOptions, useForm } from './Form.context'

// export const FORM_ITEM_MAP = {
//   content: Layout.Content,
//   // header: Layout.Header
//   // footer: Layout.Footer
//   // aside: Layout.Aside
//   actions: Layout.Actions,
//   section: Layout.Section,
//   block: Layout.Block,
//   alert: Alert,
//   // field: Field

//   // text
//   'text-field': TextField,

//   // number
//   'number-field': NumberField,
//   'slider-field': SliderField,

//   // boolean
//   'switch-field': SwitchField,
//   'checkbox-field': CheckboxField,
//   'radio-field': RadioField,

//   // // date and time
//   // 'time-field': TimeField
//   // 'date-field': DateField
//   // 'date-time-field': DateTimeField
//   // 'date-range-field': DateRangeField

//   // object
//   'group-field': GroupField,

//   // list
//   'select-field': SelectField,
//   // 'list-field': ListField

//   // actions
//   button: Button,
//   reset: FormReset,
//   submit: FormSubmit,
// }




export type FormProps = FormGroupOptions & {
  className?: string
  children?: React.ReactNode
  items?: []
  alerts?: AlertProps[]
  actions?: Action[]
}
// FIXME: https://developer.mozilla.org/en-US/docs/Web/API/FormData
/**
 * Component description.
 *
 * How to use
 * @example
 * const log = (field, store, e) => {
 *   console.log(field, store, e)
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
 *   { status: 'error', content: 'error' },
 *   { status: 'warning', content: 'warning' },
 *   { status: 'info', content: 'info' },
 *   { status: 'primary', content: 'primary' },
 *   { status: 'secondary', content: 'secondary' },
 *   { status: 'disable', content: 'disable' },
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
 *   { status: 'error', content: 'error' },
 *   { status: 'warning', content: 'warning' },
 *   { status: 'info', content: 'info' },
 *   { status: 'primary', content: 'primary' },
 *   { status: 'secondary', content: 'secondary' },
 *   { status: 'disable', content: 'disable' },
 * ]
 *
 * const ACTIONS = [
 *   { v: 'button', content: 'submit', type: 'submit' },
 *   { v: 'button', content: 'reset', type: 'reset' },
 * ]
 *
 * // Manual approach
 * <Form onSubmit={log} onReset={log}>
 *   <Form.Block>
 *     <Form.Alert status='success' content='success' />
 *     <Form.Alert status='info' content='info' />
 *     <Form.Alert status='warning' content='warning' />
 *     <Form.Alert status='error' content='error' />
 *   </Form.Block>
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
 *     <Form.Actions>
 *       <Form.Actions.Button type='reset' content='Reset' />
 *       <Form.Actions.Button type='submit' content='Submit' />
 *     </Form.Actions>
 *
 *     <Form.Group name='group' title='group' messages={MESSAGES}>
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
 *     </Form.Group>
 *
 *     <Form.List name='list' label='list' messages={MESSAGES}>
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
 *     </Form.List>
 *   </Form.Content>
 *
 *   // form actions
 *   <Form.Actions>
 *     <Form.Actions.Button type='reset' content='Reset' />
 *     <Form.Actions.Button type='submit' content='Submit' />
 *   </Form.Actions>
 * </Form>
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
 *   <Form.Block cmp={Form.Alert} items={ALERTS}>
 *     <Form.Alert status='success' content='success' />
 *     <Form.Alert status='info' content='info' />
 *     <Form.Alert status='warning' content='warning' />
 *     <Form.Alert status='error' content='error' />
 *   </Form.Block>
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
 *     <Form.Block cmp={Form.Alert} items={ALERTS} />
 *
 *     <Form.Group name='group' label='group' value={VALUE.group} items={GROUP_ITEMS} messages={MESSAGES}>
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
 *     </Form.Group>
 *
 *     <Form.List name='list' label='list' value={VALUE.list} items={LIST_ITEMS} messages={MESSAGES}>
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
 *     </Form.List>
 *   </Form.Content>
 * </Form>
 */
export function Form(props: FormProps): JSX.Element {
  const { name, alerts, items, actions, schema, onSubmit, onReset, onChange, children, className, ...otherProps } = props
  const _className = cn(css.Form, className)
  const form = useForm({ value: {}, name, schema, onChange, onReset, onSubmit })

  const onFormEvent = useCallback((event: FormEventContext) => {
    if (event.type === 'reset' || form.validate()) {
      event.preventDefault()

      const onEvent = event.type === 'submit' ? onSubmit : onReset

      onEvent?.(form.state().value, form.store().value, event)

      form.reset(event)
    }
  }, [form, onSubmit, onReset])

  return (
    <FormContext.Provider value={form} >
      <form className={_className} onSubmit={onFormEvent} onReset={onFormEvent} {...otherProps}>
        {alerts && <Block className='alerts' cmp={Alert} items={alerts} />}
        {/* {items && <Block className='content' cmp={{}} items={items} />} */}

        {children}

        {actions && <Actions className='actions' items={actions} />}
      </form>
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'

export default react.attachComponents(Form, {
  Section: Section, // Layout.Section
  Actions: Actions, // Layout.Actions
  Header: Block, // Layout.Header
  Content: Block, // Layout.Content
  Footer: Block, // Layout.Footer
  Aside: Block, // Layout.Aside
  Block: Block, // Layout.Block
  Group: FormGroup,
  List: FormGroup.List,
  Alert: Alert,
  Field: Field,
  // Action: FormButton,
  Reset: FormButton.Reset,
  Submit: FormButton.Submit,
})
