import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Layout from 'components/Layout'
import Messages, { MessageItem } from 'components/Messages'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './FormGroup.module.scss'
import { useForm, FormContext, FormGroupOptions } from '../Form.context'

export type FormGroupProps = FormGroupOptions & {
  list?: boolean
  label?: string
  messages?: MessageItem[]
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <FormGroup />
 */
export function FormGroup(props: FormGroupProps): JSX.Element {
  const { label, name, list, messages = [], schema, onChange, onSubmit, onReset, children, className, ...otherProps } = props
  const _className = cn(css.FormGroup, className)
  const value = list ? [] : {}
  const form = useForm({ value, name, schema, onChange, onReset, onSubmit })

  // TODO: filter actions and content and add gap='xs'
  // TODO: add messages component
  return (
    <FormContext.Provider value={form} >
      <Layout className={_className} {...otherProps}>
        <Layout.Top className={css.Title} content={label} />

        <Layout.Content className={css.Content} gap='xs'>
          {children}
        </Layout.Content>

        <Layout.Bottom className={css.Footer}>
          <Messages items={messages} />
        </Layout.Bottom>
      </Layout>
    </FormContext.Provider>
  )
}

FormGroup.displayName = 'FormGroup'

export default react.attachOverrides(FormGroup, {
  List: { list: true },
})
