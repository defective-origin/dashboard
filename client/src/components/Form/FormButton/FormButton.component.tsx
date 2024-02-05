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
  const { type, onClick, children, className, ...otherProps } = props
  const _className = cn(css.FormButton, className)
  const form = useForm()

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const formHandler = type === 'reset' ? form.reset : form.submit

    formHandler(event)
    onClick?.(event)
    event.preventDefault()
  }, [form, type, onClick])


  return <Button className={_className} type={type} onClick={handleClick} {...otherProps}>{children}</Button>
}

FormButton.displayName = 'FormButton'

export default react.attachOverrides(FormButton, {
  Submit: { type: 'submit' },
  Reset: { type: 'reset' },
}, {
  memoize: true,
})
