import React from 'react'

// ---| core |---
import { useLocale } from 'locale'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Icon, { IconProps } from 'components/Icon'
import Tooltip, { TooltipVariant } from 'components/Tooltip'

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
export function Copyright(props: CopyrightProps): JSX.Element {
  const { tooltip, className, ...otherProps } = props
  const _className = cn(css.Copyright, className)
  const locale = useLocale()

  return (
    <Tooltip v={tooltip} content={locale.t('MESSAGES.COPYRIGHT', { year: (new Date).getFullYear() })}>
      <Icon className={_className} v='copyright' size='sm' {...otherProps} />
    </Tooltip>
  )
}

Copyright.displayName = 'Copyright'

export default Copyright
