import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { TranslateKeys, useLocale } from 'locale'
import { Id, useAnalyticsCounter, AnalyticsCounterType, AnalyticsCounterField } from 'api'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Tooltip from 'components/Tooltip'
import Icon, { IconVariant } from 'components/Icon'
import Block, { BlockProps } from 'components/Block'

// ---| self |---
import css from './Usage.module.scss'

export const USAGE_MAP: Record<AnalyticsCounterField | string, { v: IconVariant, tooltip: TranslateKeys }> = {
  price: { v: 'favorite', tooltip: 'LABEL.FAVORITE' },
  usage: { v: 'check', tooltip: 'LABEL.USAGE' },
  rate: { v: 'star', tooltip: 'LABEL.RATE' },
}

export type UsageVariant = AnalyticsCounterType

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
  const counter = useAnalyticsCounter(id, v)
  const locale = useLocale()

  return (
    <Block className={_className} v='x' g='xxs' fit {...otherProps}>
      {Object.keys(counter.data).map((name, idx) => (
        <Tooltip key={idx} content={locale.t(`${USAGE_MAP[name].tooltip}`, { count: counter.data[name as AnalyticsCounterField] })}>
          <Icon className={_className} v={USAGE_MAP[name].v} {...otherProps} />
        </Tooltip>
      ))}

      {children}
    </Block>
  )
}

Usage.displayName = 'Usage'

export default Usage
