import React from 'react'

// ---| core |---
import { cn, react } from 'tools'
import { useFunc } from 'hooks'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/actions/Button'

// ---| self |---
import css from './FormButton.module.scss'
import { useForm } from '../Form.context'

export type FormButtonProps = ButtonProps & {
  path?: string
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <FormButton />
 */
export function FormButton(props: FormButtonProps) {
  const { path, type, children, onClick, className, ...otherProps } = props
  const _className = cn(css.FormButton, className)
  const form = useForm()

  const handleClick = useFunc((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (type === 'submit') {
      form?.submit(path)
    } else if (type === 'reset') {
      form?.reset(path)
    }

    onClick?.(event)
  })

  return <Button className={_className} type={type} onClick={handleClick} {...otherProps}>{children}</Button>
}

FormButton.displayName = 'FormButton'

export default react.attachOverrides(FormButton, {
  Submit: { type: 'submit' },
  Reset: { type: 'reset' },
}, {
  memoize: true,
})
