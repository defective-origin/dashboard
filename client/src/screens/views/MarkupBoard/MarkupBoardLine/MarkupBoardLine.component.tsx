import React, { useRef } from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Item from 'components/layouts/Item'

// ---| self |---
import css from './MarkupBoardLine.module.scss'
import { MarkupLineActionPayload, useMarkupLineAction, MarkupLineVariant } from './MarkupBoardLine.hooks'


export type MarkupBoardLineProps = {
  v?: MarkupLineVariant
  index?: number
  span?: number
  className?: string
  children?: React.ReactNode
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <MarkupBoardLine />
 */
export function MarkupBoardLine(props: MarkupBoardLineProps) {
  const { v = 'row', index = 0, span = 0, className, children, ...otherProps } = props
  const _className = cn(css.MarkupBoardLine, index % 2 === 0 ? css[v] : css.gap, className)
  const ref = useRef<HTMLDivElement>(null)
  const area = v === 'row'
    ? `${index + 1}/${1}/${index + 1}/${span + 1}`
    : `${1}/${index + 1}/${span + 1}/${index + 1}`


  // TODO: remove and use inside markupBoard
  useMarkupLineAction<MarkupLineActionPayload>(v, index, detail => {
    if (!ref.current) {
      return
    }

    if (detail.highlight) {
      ref.current.dataset.highlight = detail.highlight?.toString()
    }

    if (detail.reset) {
      ref.current.dataset.highlight = 'false'
    }
  })

  return (
    <Item ref={ref} className={_className} area={area} {...otherProps}>
      {children}
    </Item>
  )
}

MarkupBoardLine.displayName = 'MarkupBoardLine'

export default MarkupBoardLine
