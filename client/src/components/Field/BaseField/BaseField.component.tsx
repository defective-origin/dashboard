import React, { useCallback, useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'
import Block, { BlockProps } from 'components/Block'
import Messages, { MessageItem, MessageColor } from 'components/Messages'
import { FormFieldValue, FormValueOptions, useForm } from 'components/Form'

// ---| self |---
import css from './BaseField.module.scss'

const MESSAGE_ORDER: Record<MessageColor, number> = {
  error: 0,
  warning: 1,
  info: 2,
  success: 3,
  primary: 4,
  secondary: 5,
  disable: 6,
}

export type BaseFieldProps<P extends object> = P & FormValueOptions & Pick<BlockProps, 'align'> & {
  label?: string
  throttle?: number // TODO: implement
  validateOnBlur?: boolean
  hide?: boolean | ((field: FormFieldValue, form: FormFieldValue) => boolean)
  messages?: MessageItem[]
  className?: string
  checked?: boolean
  as?: React.ElementType<P>
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
  const {
    hide = false,
    name,
    label,
    as,
    throttle: tms,
    validateOnBlur,
    value,
    messages = [],
    schema,
    align,
    onChange,
    change,
    selectProps,
    className,
    ...otherProps
  } = props
  const _className = cn(css.BaseField, className)
  const form = useForm({ name, value, schema, onChange })
  const Tag = as as React.FunctionComponent<P>
  const fullName = useMemo(() => `${form.state().path[0]}${form.state().path.slice(1).map((n) => `[${n}]`).join('')}`, [form])
  const allMessages = useMemo(() =>
    form.state().errors
      .map<MessageItem>((content: string) => ({ color: 'error', content }))
      .concat(...messages)
      .sort((a, b) => MESSAGE_ORDER[a.color ?? 'primary'] - MESSAGE_ORDER[b.color ?? 'primary'])
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

  // FIXME: rewrite on layout?
  return (
    <Block className={_className} gap='xs' align={align}>
      <Text.Subtitle2 content={label} />

      <Tag name={fullName} onBlur={onBlur} onChange={handleChange} {...otherProps as P} {...inputProps} />

      <Messages items={allMessages} />
    </Block>
  )
}

BaseField.displayName = 'BaseField'

export default BaseField
