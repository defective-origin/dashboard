import React, { useCallback, useImperativeHandle, useLayoutEffect, useMemo, useState } from 'react'

// ---| core |---
import { cn, obj, react } from 'tools'
import { useFunc, useSubscriptions } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout, { LayoutProps } from 'components/layouts/Layout'

// ---| self |---
import css from './Form.module.scss'
import FormButton from './FormButton'
import { FormContext, FormFieldManager, FormManager, FormErrors, FormEvent, FormPath } from './Form.context'


export type FormProps<O extends object> = Pick<LayoutProps, 'p' | 'g' | 'v'> & {
  init?: O
  // TODO: pass manager instead of ref
  manager?: React.Ref<FormManager<O>>
  notifyParent?: boolean
  checkOnSubmit?: boolean
  className?: string
  children?: React.ReactNode
  onReset?: (state: O) => void
  onChange?: (state: O) => void
  onSubmit?: (store: O) => void
}

/**
 * Allows to build and work with form.
 * How to use
 * @example
 * import Field from 'components/fields'
 * // or
 * import Field from 'screens/fields'
 *
 * const log = (value) => console.log(value)
 *
 * const INIT = {
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
 * const SELECT_ITEMS = [
 *   { value: 'value0', children: 'FIRST' },
 *   { value: 'value1', children: 'SECOND' },
 *   { value: 'value2', children: 'THIRD' },
 * ]
 *
 * const TOGGLING_ITEMS = [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }]
 *
 * <Form init={INIT} onSubmit={formLog} onChange={formLog} onReset={log} p='xxl' checkOnSubmit>
 *   <Layout g='xs'>
 *     <WatchField path='slider' />
 *     <Actions g='xs'>
 *       <Text content='GLOBAL FORM ACTIONS' />
 *       <Actions.Button type='reset' content='Reset' color='info' size='xs' />
 *       <Actions.Button type='submit' content='Submit' color='success' size='xs' />
 *     </Actions>
 *
 *     <Actions g='xs'>
 *       <Text content='FORM ACTIONS' />
 *       <Form.Reset content='Reset' color='info' size='xs' />
 *       <Form.Submit content='Submit' color='success' size='xs' />
 *     </Actions>
 *
 *     <Layout g='xs' columns={4}>
 *       <Field.Slider path='slider' label='Slider' init={75} onChange={log} />
 *       <Field.Number path='number' label='Number' init={75} help='Help text' onChange={log} />
 *
 *       <Field.Select path='select' label='Select' init='value0' help='Help text' onChange={log} items={SELECT_ITEMS} />
 *       <Field.Text path='text' label='Text' init='value' help='Help text' onChange={log} rules={TEXT_RULES} checkOnChange />
 *     </Layout>
 *
 *     <Layout g='xs' columns={6}>
 *       <Field.Checkbox path='with' label='With Value' init='checkbox' checked onChange={log} />
 *       <Field.Checkbox path='without' label='Without Value' checked onChange={log} />
 *
 *       <Field.Switch path='switch1' label='Switch1' onChange={log} />
 *       <Field.Switch path='switch2' label='Switch2' onChange={log} />
 *
 *       <Field.Radio path='radio1' label='Radio1' init={1} onChange={log} />
 *       <Field.Radio path='radio2' label='Radio2' init={2} onChange={log} checked />
 *     </Layout>
 *
 *     <Layout g='xs' columns={2}>
 *       <Field.RadioGroup path='radio-group' label='Radio Group'
 *         init='b'
 *         items={TOGGLING_ITEMS}
 *         columns={TOGGLING_ITEMS.length}
 *       />
 *       <Field.CheckboxList path='checkbox-list' label='Checkbox List'
 *         init={['b']}
 *         items={TOGGLING_ITEMS}
 *         columns={TOGGLING_ITEMS.length}
 *       />
 *     </Layout>
 *
 *     <Layout g='xs'>
 *       <Actions g='xs'>
 *         <Text content='GROUP' />
 *         <Form.Reset path='group' content='Reset' color='info' size='xs' />
 *         <Form.Submit path='group' content='Submit' color='success' size='xs' />
 *       </Actions>
 *
 *       <Layout columns={7} g='xs'>
 *         <Field.Radio path='group.radio' label='Radio' init='radio value' onChange={log} />
 *         <Field.Switch path='group.switch' label='Switch' init={true} onChange={log} />
 *         <Field.Checkbox path='group.checkbox' label='Checkbox' init='checkbox' checked onChange={log} />
 *         <Field.Slider path='group.slider' label='Slider' init={50} onChange={log} />
 *         <Field.Select path='group.select' label='Select' init='value1' help='Help text' onChange={log} items={SELECT_ITEMS} />
 *         <Field.Text path='group.text' label='Text' init='value' help='Help text' rules={TEXT_RULES} checkOnChange onChange={log} />
 *         <Field.Number path='group.number' label='Number' init={50} help='Help text' onChange={log} />
 *       </Layout>
 *     </Layout>
 *
 *     <Layout g='xs'>
 *       <Actions g='xs'>
 *         <Text content='LIST' />
 *         <Form.Reset path='list' content='Reset' color='info' size='xs' />
 *         <Form.Submit path='list' content='Submit' color='success' size='xs' />
 *       </Actions>
 *
 *       <Layout columns={7} g='xs'>
 *         <Field.Radio path='list.0' label='Radio' init='radio value' onChange={log} />
 *         <Field.Switch path='list.1' label='Switch' init={true} onChange={log} />
 *         <Field.Checkbox path='list.2' label='Checkbox' init='checkbox' checked onChange={log} />
 *         <Field.Slider path='list.3' label='Slider' init={25} onChange={log} />
 *         <Field.Select path='list.4' label='Select' init='value2' help='Help text' items={SELECT_ITEMS} onChange={log} />
 *         <Field.Text path='list.5' label='Text' init='value' help='Help text' rules={TEXT_RULES} checkOnChange onChange={log} />
 *         <Field.Number path='list.6' label='Number' init={25} help='Help text' onChange={log} />
 *       </Layout>
 *     </Layout>
 *   </Layout>
 * </Form>
 */
export function Form<O extends object>(props: FormProps<O>): JSX.Element {
  const { init, manager, checkOnSubmit, notifyParent, onSubmit, onChange, onReset, p, g = 'xs', v, children, className } = props
  const _className = cn(css.Form, className)
  const [initial] = useState<O>({} as O)
  const [state] = useState<O>({} as O)
  const [errors] = useState({} as FormErrors<O>)
  const [fields] = useState<Record<string, FormFieldManager<O>>>({})
  const subs = useSubscriptions<FormPath<O>, FormEvent<O>>()

  const toFields = useCallback((path?: string) => {
    if (path) {
      return Object.values(fields).filter(field => field.path.startsWith(path))
    }

    return Object.values(fields)
  }, [fields])

  const notify = useFunc((path?: FormPath<O>) => {
    // notify current and nested fields
    for (const name of subs.names(path)) {
      subs.emit(name, obj.get(state, name), state)
    }

    // notify parent fields
    if (notifyParent && path) {
      const parentKeys = obj.toKeys(path)

      for (let i = 1; i < parentKeys.length; i++) {
        parentKeys.pop()

        const parentPath = obj.toPath(parentKeys)

        subs.emit(parentPath, obj.get(state, parentPath), state)
      }
    }

    // notify form
    subs.emit('form', state, state)
  })

  const setErrors = useFunc<FormManager<O>['setErrors']>((path, err) => {
    if (err.length) {
      obj.set(errors, path, err)
    } else {
      obj.del(errors, path, true)
    }
  })

  const setValue = useFunc<FormManager<O>['setValue']>((path, value) => {
    obj.set(state, path, value)

    onChange?.(state)
    notify(path)
  })

  const get = useCallback<FormManager<O>['get']>(path => ({
    init: obj.get(initial, path),
    value: obj.get(state, path),
    errors: obj.get(errors, path),
  }), [errors, initial, state])

  const set = useFunc<FormManager<O>['set']>((path, value) => fields[path]?.set(value))

  const reset = useFunc<FormManager<O>['reset']>(path => {
    toFields(path).map(field => field.reset())

    onReset?.(obj.clone(state))
  })

  const check = useFunc<FormManager<O>['check']>(path => {
    toFields(path).map(field => field.check())
  })

  const submit = useFunc<FormManager<O>['submit']>(path => {
    if (checkOnSubmit) {
      check(path)
    }

    if (!checkOnSubmit || !Object.keys(errors).length) {
      onSubmit?.(obj.clone(state))
    }
  })

  const focus = useFunc<FormManager<O>['focus']>(path => document.getElementById(path)?.focus())

  const connect = useFunc<FormManager<O>['connect']>(field => {
    fields[field.path] = field

    if (field.init !== undefined) {
      obj.set(initial, field.path, field.init)
    }

    field.reset()
  })

  const disconnect = useFunc<FormManager<O>['disconnect']>(field => {
    delete fields[field.path]

    obj.del(initial, field.path, true)
    obj.del(errors, field.path, true)
  })

  // reinitialize form
  useLayoutEffect(() => {
    const reassign = (oldState: object, newState = {}) => {
      Object.keys(oldState).forEach(key => obj.del(oldState, key))

      Object.assign(oldState, structuredClone(newState))
    }

    reassign(errors)
    reassign(state, init)
    reassign(initial, init)

    Object.values(fields).map(connect)
  }, [connect, errors, fields, init, initial, state])

  const formManager = useMemo(() =>
    ({ ...subs, initial, state, errors, setValue, setErrors, submit, get, set, reset, check, focus, connect, disconnect })
  , [subs, initial, state, errors, setValue, setErrors, submit, get, set, reset, check, focus, connect, disconnect])

  useImperativeHandle(manager, () => formManager, [formManager])

  // html form handlers
  const resetForm = useFunc(() => reset())
  const submitForm = useFunc((event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit()
  })

  return (
    <FormContext.Provider value={formManager as unknown as FormManager<object>}>
      <Layout
        v={v}
        p={p}
        g={g}
        as='form'
        className={_className}
        onSubmit={submitForm}
        onReset={resetForm}
      >
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
