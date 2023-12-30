import React, { useCallback, useMemo } from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Repeat from 'components/Repeat'
import Text, { TextProps, TextStatus } from 'components/Text'
import Layout from 'components/Layout'
import { FormFieldValue, FormValueOptions, useForm } from 'components/Form'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './BaseField.module.scss'

const MESSAGE_ORDER: Record<TextStatus, number> = {
  error: 0,
  warning: 1,
  info: 2,
  success: 3,
  primary: 4,
  secondary: 5,
  disable: 6,
}

export type BaseFieldProps<P extends object> = P & FormValueOptions & {
  label?: string
  throttle?: number // FIXME: implement
  validateOnBlur?: boolean
  hide?: boolean | ((field: FormFieldValue, form: FormFieldValue) => boolean)
  messages?: TextProps[]
  className?: string
  checked?: boolean
  as?: React.FunctionComponent<P> | keyof JSX.IntrinsicElements
  change?: (event: React.ChangeEvent<HTMLInputElement>) => FormFieldValue
  selectProps?: (value?: FormFieldValue) => Partial<P>
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <BaseField />
 */
export function BaseField<P extends object>(props: BaseFieldProps<P>): JSX.Element | null {
  const { hide = false, name, label, as, throttle: tms, validateOnBlur, value, messages = [], schema, onChange, change, selectProps, className, ...otherProps } = props
  const _className = cn(css.BaseField, className)
  const form = useForm({ name, value, schema, onChange })
  const Tag = as as React.FunctionComponent<P>
  const fullName = useMemo(() => `${form.state().path[0]}${form.state().path.slice(1).map((n) => `[${n}]`).join('')}`, [form])
  const allMessages = useMemo(() =>
    form.state().errors
      .map<TextProps>((content: string) => ({ status: 'error', content }))
      .concat(...messages)
      .sort((a, b) => MESSAGE_ORDER[a.status ?? 'primary'] - MESSAGE_ORDER[b.status ?? 'primary'])
  , [form, messages])

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = change ? change(event) : event.target.value

    if (form.state().value !== value) {
      form.set(value, event)
    }
  }, [form, change])

  const onBlur = useCallback(() => validateOnBlur && form.validate(), [form, validateOnBlur])

  const isHidden = typeof hide === 'boolean'
    ? hide
    : hide(form.state().value, form.store().value)
  if (isHidden || !Tag) {
    return null
  }

  const inputProps = selectProps?.(form.state().value) ?? { value: form.state().value }

  return (
    <Layout className={_className}>
      <Layout.Top className={css.Title} content={label} />

      <Layout.Content className={css.Content}>
        <Tag name={fullName} onBlur={onBlur} onChange={handleChange} {...otherProps as P} {...inputProps} />
      </Layout.Content>

      <Layout.Bottom className={css.Messages}>
        <Repeat className={css.Message} cmp={Text.Caption} items={allMessages} />
      </Layout.Bottom>
    </Layout>
  )
}

BaseField.displayName = 'BaseField'

export default BaseField
