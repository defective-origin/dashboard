import React, { useCallback } from 'react'

// ---| core |---
import { cn, react } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button, { ButtonProps } from 'components/Button'

// ---| self |---
import css from './FormButton.module.scss'
import { useForm } from '../Form.context'

export type FormButtonProps = ButtonProps & {
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
export function FormButton(props: FormButtonProps): JSX.Element {
  const { type, children, onClick, className, ...otherProps } = props
  const _className = cn(css.FormButton, className)
  const field = useForm()

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    if (type === 'submit') {
      field.submit(event)
    } else if (type === 'reset') {
      field.reset()
    }

    onClick?.(event)
  }, [field, type, onClick])

  return <Button className={_className} type={type} onClick={handleClick} {...otherProps}>{children}</Button>
}

FormButton.displayName = 'FormButton'

export default react.attachOverrides(FormButton, {
  Submit: { type: 'submit' },
  Reset: { type: 'reset' },
}, {
  memoize: true,
})
