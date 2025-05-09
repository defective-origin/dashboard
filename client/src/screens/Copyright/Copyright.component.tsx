import React from 'react'

// ---| core |---
import { t } from 'locale'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconProps } from 'components/views/Icon'
import Tooltip, { TooltipVariant } from 'components/popups/Tooltip'

// ---| self |---
import css from './Copyright.module.scss'

export type CopyrightProps = Partial<IconProps> & {
  tooltip?: TooltipVariant
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
    <Tooltip v={tooltip} content={t('MESSAGE.COPYRIGHT', { year: (new Date).getFullYear() })}>
      <Icon className={_className} v='copyright' size='sm' {...otherProps} />
    </Tooltip>
  )
}

Copyright.displayName = 'Copyright'

export default Copyright
