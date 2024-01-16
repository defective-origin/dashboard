import React from 'react'

// ---| core |---
// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'
import Block, { BlockProps } from 'components/Block'
import Messages, { MessageItem } from 'components/Messages'

// ---| common |---
import { cn, react } from 'common/tools'

// ---| self |---
import css from './FormGroup.module.scss'
import { useForm, FormContext, FormGroupOptions } from '../Form.context'

export type FormGroupProps = FormGroupOptions & BlockProps & {
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

  // FIXME: rewrite on layout?
  return (
    <FormContext.Provider value={form} >
      <Block className={_className} gap='xs' {...otherProps}>
        <Text.Caption content={label} />

        {children}

        <Messages items={messages} />
      </Block>
    </FormContext.Provider>
  )
}

FormGroup.displayName = 'FormGroup'

export default react.attachOverrides(FormGroup, {
  List: { list: true },
})
