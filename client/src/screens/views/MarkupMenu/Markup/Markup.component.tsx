import React, { useMemo } from 'react'

// ---| core |---
import { cn } from 'tools'
import { t } from 'locale'

// ---| screens |---
import { MarkupOptions, sort } from 'screens/views/MarkupBoard'
// ---| components |---
import Block, { BlockProps } from 'components/layouts/Block'
import Dropdown, { DropdownProps } from 'components/actions/Dropdown'

// ---| self |---
import css from './Markup.module.scss'
import { MARKUP_SCREEN_MAP } from './Markup.constants'
import MarkupSpec from './MarkupSpec'

export type MarkupProps = DropdownProps & {
  options?: MarkupOptions
}

/**
 * Component description.
 * @example
 * <Markup />
 */
export function Markup(props: MarkupProps) {
  const { options, className, ...otherProps } = props
  const option = MARKUP_SCREEN_MAP[options?.width ?? 0]

  return (
    <Dropdown
      title={t(option.label)}
      className={cn(css.Markup, className)}
      start={option.icon}
      {...otherProps}
    >
      <MarkupSpec options={options} />
    </Dropdown>
  )
}

Markup.displayName = 'Markup'


export type MarkupListProps = BlockProps & {
  items?: MarkupOptions[]
}

Markup.List = function MarkupList(props: MarkupListProps) {
  const { items, children, className, ...otherProps } = props
  const sorted = useMemo(() => sort(items), [items])

  return (
    <Block className={cn(css.Markups, className)} v='x' g='xxs' fit {...otherProps}>
      {sorted?.map(options => <Markup key={options.width} options={options} />)}

      {children}
    </Block>
  )
}

export default Markup
