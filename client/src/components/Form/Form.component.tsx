import React from 'react'

// ---| core |---
import { FormContext, FormGroupValue, FormOptions, useForm } from 'hooks'
import { cn, react } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/Layout'

// ---| self |---
import css from './Form.module.scss'
import FormButton from './FormButton'

export type FormProps<F extends object = FormGroupValue> = FormOptions<F> & LayoutProps & {
  className?: string
  children?: React.ReactNode
}

// TODO: update documentation
// TODO: https://developer.mozilla.org/en-US/docs/Web/API/FormData
/**
 * Allows to build and work with form.
 *
 * How to use
 * @example
 * import Field from 'components/fields'
 * // or
 * import Field from 'screens/fields'
 *
 * const log = (value) => console.log(value)
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
 * const SELECT_OPTIONS = [
 *   { value: 'value0', children: 'FIRST' },
 *   { value: 'value1', children: 'SECOND' },
 *   { value: 'value2', children: 'THIRD' },
 * ]
 *
 *    <Form name='FORM_NAME' onSubmit={formLog} onChange={formLog} onReset={log} p='xxl'>
 *      <Layout g='xs'>
 *        <Actions g='xs'>
 *          <Text content='GLOBAL FORM ACTIONS' />
 *          <Actions.Button type='reset' content='Reset' color='info' size='xs' />
 *          <Actions.Button type='submit' content='Submit' color='success' size='xs' />
 *        </Actions>
 *
 *        <Layout v='board' g='xs' columns={2}>
 *          <Field.Checkbox name='with' label='with' value='checkbox' checked onChange={log} />
 *          <Field.Checkbox name='without' label='without' checked onChange={log} />
 *
 *          <Field.Radio name='radio' label='radio 1' value={1} onChange={log} checked />
 *          <Field.Radio name='radio' label='radio 2' value={2} onChange={log} />
 *
 *          <Field.Switch name='switch1' label='switch1' onChange={log} />
 *          <Field.Switch name='switch2' label='switch2' onChange={log} />
 *
 *          <Field.Slider name='slider' label='slider' value={75} onChange={log} />
 *          <Field.Number name='number' label='number' value={75} message='Help text' onChange={log} />
 *
 *          <Field.Select name='select' label='select' value='value0' message='Help text' onChange={log} items={SELECT_OPTIONS} />
 *          <Field.Text name='text' label='text' value='value' message='Help text' onChange={log} />
 *        </Layout>
 *
 *        <Field.Group name='group' label='group' onChange={log}>
 *          <Actions g='xs'>
 *            <Text content='GROUP ACTIONS' />
 *            <Form.Reset content='Reset' color='info' size='xs' />
 *            <Form.Submit content='Submit' color='success' size='xs' />
 *          </Actions>
 *
 *          <Layout v='x' g='xs'>
 *            <Field.Radio name='group-radio' label='radio' value={true} onChange={log} />
 *            <Field.Switch name='group-switch' label='switch' value={true} onChange={log} />
 *            <Field.Checkbox name='group-checkbox' label='checkbox' value='checkbox' checked onChange={log} />
 *            <Field.Slider name='group-slider' label='slider' value={50} onChange={log} />
 *            <Field.Select name='group-select' label='select' value='value0' message='Help text' onChange={log} items={SELECT_OPTIONS} />
 *            <Field.Text name='group-text' label='text' value='value' message='Help text' onChange={log} />
 *            <Field.Number name='group-number' label='number' value={50} message='Help text' onChange={log} />
 *          </Layout>
 *        </Field.Group>
 *
 *        <Field.Group name='list' label='list' onChange={log} list>
 *          <Actions g='xs'>
 *            <Text content='LIST ACTIONS' />
 *            <Form.Reset content='Reset' color='info' size='xs' />
 *            <Form.Submit content='Submit' color='success' size='xs' />
 *          </Actions>
 *
 *          <Layout v='x' g='xs'>
 *            <Field.Radio name='item_0' label='radio' value={true} onChange={log} />
 *            <Field.Switch name='item_1' label='switch' value={true} onChange={log} />
 *            <Field.Checkbox name='item_2' label='checkbox' value='checkbox' checked onChange={log} />
 *            <Field.Slider name='item_3' label='slider' value={25} onChange={log} />
 *            <Field.Select name='item_4' label='select' value='value0' message='Help text' items={SELECT_OPTIONS} onChange={log} />
 *            <Field.Text name='item_5' label='text' value='value' message='Help text' onChange={log} />
 *            <Field.Number name='item_6' label='number' value={25} message='Help text' onChange={log} />
 *          </Layout>
 *        </Field.Group>
 *      </Layout>
 *    </Form>
 */
export function Form<F extends object = FormGroupValue>(props: FormProps<F>): JSX.Element {
  const { resetId, submitId, value = {} as F, name, onSubmit, onReset, onChange, children, className, ...otherProps } = props
  const _className = cn(css.Form, className)
  const field = useForm<F>({ value, name, onChange, onReset, onSubmit, resetId, submitId })

  // TODO: add rules: [] check for fields

  return (
    <FormContext.Provider value={field as any} >
      <Layout as='form' className={_className} onSubmit={field.submit} onReset={field.reset} g='xs' {...otherProps}>
        {children}
      </Layout>
    </FormContext.Provider>
  )
}

Form.displayName = 'Form'

export default react.attachComponents(Form, {
  Reset: FormButton.Reset,
  Submit: FormButton.Submit,
})
