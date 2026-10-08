import React from 'react'

// ---| core |---
// ---| components |---
import { withPopup } from 'components/popups/Popup'

// ---| self |---
import { ButtonStyleOptions, useButtonStyle } from './Button.hooks'


export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonStyleOptions

/**
 * Simple button without inner logic.
 * @example
 * <Button start='icon-name' content='Cancel' end='icon-name' onCLick={handleClick} popup='click me' />
 */
export const Button = withPopup((props: ButtonProps) => {
  const updatedProps = useButtonStyle({ color: 'primary', ...props })

  return <button {...updatedProps} />
})

Button.displayName = 'Button'

export default Button
