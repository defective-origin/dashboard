import React from 'react'

// ---| core |---
// ---| components |---
import { withPopup } from 'components/popups/Popup'
import Progress from 'components/views/Progress'

// ---| self |---
import css from './Button.module.scss'
import { ButtonStyleOptions, useButtonStyle } from './Button.hooks'


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleOptions & {
  ref?: React.Ref<HTMLButtonElement>
  progress?: boolean
}

/**
 * Simple button without inner logic.
 * @example
 * <Button start='icon-name' content='Cancel' end='icon-name' onClick={handleClick} popup='click me' />
 */
export const Button = withPopup((props: ButtonProps) => {
  const { progress, children, ...updatedProps } = useButtonStyle({
    color: 'primary',
    ...props,
    disabled: props.progress || props.disabled,
  })

  return (
    <button {...updatedProps}>
      {children}
      {progress && <Progress className={css.progress} />}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
