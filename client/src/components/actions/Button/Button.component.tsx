import React from 'react'

// ---| core |---
// ---| components |---
import { withPopup } from 'components/popups/Popup'

// ---| self |---
import { ButtonStyleOptions, useButtonStyle } from './Button.hooks'


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleOptions & {
  ref?: React.Ref<HTMLButtonElement>
}

/**
 * Simple button without inner logic.
 * @example
 * <Button start='icon-name' content='Cancel' end='icon-name' onClick={handleClick} popup='click me' />
 */
export const Button = withPopup((props: ButtonProps) => {
  const updatedProps = useButtonStyle({ color: 'primary', ...props })

  // TODO: add processing with promise callback onClick and set icon progress_activity
  return <button {...updatedProps} />
})

Button.displayName = 'Button'

export default Button
