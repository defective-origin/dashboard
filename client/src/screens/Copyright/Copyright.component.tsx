import React from 'react'

// ---| core |---
import { useLocale } from 'locale'
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'

// ---| self |---
import css from './Copyright.module.scss'

export type CopyrightProps = {
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Copyright />
 */
export function Copyright(props: CopyrightProps): JSX.Element {
  const { className, ...otherProps } = props
  const _className = cn(css.Copyright, className)
  const locale = useLocale()

  return (
    <Text.Body2
      className={_className}
      color='secondary'
      content={locale.t('MESSAGES.COPYRIGHT', { year: (new Date).getFullYear() })}
      {...otherProps}
    />
  )
}

Copyright.displayName = 'Copyright'

export default Copyright
