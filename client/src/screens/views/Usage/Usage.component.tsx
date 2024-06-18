import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { TranslateKeys, useLocale } from 'locale'
import { Id, useCounters, CounterVariant, CounterType } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Tooltip from 'components/Tooltip'
import Icon, { IconVariant } from 'components/Icon'
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Usage.module.scss'

export const USAGE_MAP: Record<CounterType, { v: IconVariant, tooltip: TranslateKeys }> = {
  FAVORITE: { v: 'favorite', tooltip: 'LABEL.FAVORITE' },
  USAGE: { v: 'check', tooltip: 'LABEL.USAGE' },
}

export type UsageVariant = CounterVariant

export type UsageProps = Omit<BlockProps, 'v'> & {
  id?: Id
  v?: UsageVariant
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Usage />
 */
export function Usage(props: UsageProps): JSX.Element {
  const { id, v, children, className, ...otherProps } = props
  const _className = cn(css.Usage, className)
  const items = useCounters(id, v)
  const locale = useLocale()

  return (
    <Block className={_className} v='x' g='xxs' fit {...otherProps}>
      {items.map((item, idx) => (
        <Tooltip key={idx} content={locale.t(`${USAGE_MAP[item.type].tooltip}`, { count: item.value })}>
          <Icon className={_className} v={USAGE_MAP[item.type].v} {...otherProps} />
        </Tooltip>
      ))}

      {children}
    </Block>
  )
}

Usage.displayName = 'Usage'

export default Usage
