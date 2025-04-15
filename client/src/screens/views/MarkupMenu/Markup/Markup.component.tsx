import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'

// ---| pages |---
// ---| screens |---
import { MarkupOptions, sort } from 'screens/views/MarkupBoard'
// ---| components |---
import Icon from 'components/views/Icon'
import Popup, { PopupVariant } from 'components/popups/Popup'
import Block, { BlockProps } from 'components/layouts/Block'

// ---| self |---
import css from './Markup.module.scss'
import { MARKUP_SCREEN_MAP } from './Markup.constants'
import MarkupSpec from './MarkupSpec'

export type MarkupProps = {
  options?: MarkupOptions
  tooltipSide?: PopupVariant
  className?: string
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Markup />
 */
export function Markup(props: MarkupProps) {
  const { options, tooltipSide, className, ...otherProps } = props
  const _className = cn(css.Markup, className)
  const option = MARKUP_SCREEN_MAP[options?.width ?? 0]

  return (
    <Popup
      title={t(option.label)}
      trigger={<Icon className={_className} v={option.icon} {...otherProps} />}
      v={tooltipSide}
    >
      <MarkupSpec options={options} />
    </Popup>
  )
}

Markup.displayName = 'Markup'


export type MarkupListProps = BlockProps & {
  items?: MarkupOptions[]
}

Markup.List = function MarkupList(props: MarkupListProps) {
  const { items, children, className, ...otherProps } = props
  const _className = cn(css.Markups, className)
  const sorted = useMemo(() => sort(items), [items])

  return (
    <Block className={_className} v='x' g='xxs' fit {...otherProps}>
      {sorted?.map(options => <Markup key={options.width} options={options} />)}

      {children}
    </Block>
  )
}

export default Markup
