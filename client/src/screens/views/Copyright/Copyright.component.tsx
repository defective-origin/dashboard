import React from 'react'

// ---| core |---
import { t } from 'locale'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconProps } from 'components/views/Icon'
import Popup, { PopupVariant } from 'components/popups/Popup'

// ---| self |---
import css from './Copyright.module.scss'

export type CopyrightProps = Partial<IconProps> & {
  tooltip?: PopupVariant
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Copyright />
 */
export function Copyright(props: CopyrightProps) {
  const { tooltip, className, ...otherProps } = props
  const _className = cn(css.Copyright, className)

  return (
    <Popup
      v={tooltip}
      trigger={<Icon className={_className} v='copyright' size='sm' {...otherProps} />}
      content={t('MESSAGE.COPYRIGHT', { year: (new Date).getFullYear() })}
    />
  )
}

Copyright.displayName = 'Copyright'

export default Copyright
