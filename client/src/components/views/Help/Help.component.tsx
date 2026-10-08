import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Dropdown, { DropdownProps } from 'components/actions/Dropdown'


// ---| self |---
import css from './Help.module.scss'

export type HelpProps = DropdownProps

/**
 * Show description in popup.
 * @example
 * <Help title='Title' content='Content' maxWidth={500} />
 */
export function Help(props: HelpProps) {
  const { content, children, className, ...otherProps } = props

  return (
    <Dropdown
      className={cn(css.Help, className)}
      popupSide='top'
      start='help'
      v='wrapper'
      arrow
      {...otherProps}
    >
      {content ?? children}
    </Dropdown>
  )
}

Help.displayName = 'Help'

export default Help
