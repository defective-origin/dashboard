import React from 'react'

// ---| core |---
import { useLauncher } from 'Launcher'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/Text'

// ---| common |---
import { cn } from 'common/tools'

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
  const app = useLauncher()

  return (
    <Text.H5
      className={_className}
      size='xs'
      color='secondary'
      content={app.t('MESSAGES.COPYRIGHT', { year: (new Date).getFullYear() })}
      {...otherProps}
    />
  )
}

Copyright.displayName = 'Copyright'

export default Copyright
