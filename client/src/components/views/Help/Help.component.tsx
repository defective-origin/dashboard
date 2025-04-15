import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Size } from 'theme'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Button from 'components/actions/Button'
import Popup, { PopupProps } from 'components/popups/Popup'


// ---| self |---
import css from './Help.module.scss'

export type HelpProps = PopupProps & {
  size?: Size
}

/**
 * Show description in popup.
 *
 * How to use
 * @example
 * <Help title='Title' content='Content' maxWidth={500} />
 */
export function Help(props: HelpProps) {
  const { size, className, ...otherProps } = props
  const _className = cn(css.Help, className)

  return (
    <Popup
      className={_className}
      arrow
      v='top'
      trigger={o => <Button start='help' active={o.isOn} size={size} />}
      {...otherProps}
    />
  )
}

Help.displayName = 'Help'

export default Help
