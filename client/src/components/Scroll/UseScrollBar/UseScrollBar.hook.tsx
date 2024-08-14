import React, { useMemo, useRef } from 'react'

// ---| core |---
import { cn, obj } from 'tools'
import { Direction, Size, px } from 'theme'
import { useElement, ElementOptions, useEvent, useFunc } from 'hooks'

// ---| components |---
import Button from 'components/Button'

// ---| self |---
import './UseScrollBar.module.scss'

const SCROLLBAR_PROPERTY_MAP = {
  x: { mouse: 'pageX', margin: 'marginBottom', size: 'width', height: 'offsetWidth', width: 'offsetHeight', pos: 'left', visibility: 'visibility' },
  y: { mouse: 'pageY', margin: 'marginRight', size: 'height', height: 'offsetHeight', width: 'offsetWidth', pos: 'top', visibility: 'visibility' },
}

export type SizeOptions = {
  pages: number
  track: number
  thumb: number
  thumbPosition: number
  scrollable: boolean
}

export type ScrollShift = number | undefined
export type ScrollBarSize = Size
export type ScrollBarVariant = Exclude<Direction, 'xy'>

export type ScrollBarOptions = ScrollOptions & {
  className?: string
  thumbClassName?: string
  backClassName?: string
  /** Show back button when position more then passed value. By default 0 */
  back?: ScrollShift
  /** Size of bar, thumb, back button. */
  size?: ScrollBarSize
  /** Scrollbar direction. */
  v?: ScrollBarVariant
  /** Is scrollbar on. By default true. */
  enabled?: boolean
  /** Show scrollbars all time. Not only on container hover. */
  visible?: boolean
  /** Space between scroll and border. */
  indent?: number
  /** Container selector. If not passed then takes first parent node. */
  container?: ElementOptions<HTMLElement>
}

export type ScrollBarReturnOptions = null | {
  display: (isMouseInside?: boolean) => void
  refresh: (_container?: number, _content?: number, shift?: number) => void
  shadows: JSX.Element
  element: JSX.Element
  button: JSX.Element
}

/**
 * Hook descriptions
 *
 * @example
 * const options = useScrollBar(conf)
 */
export const useScrollBar = (options: ScrollBarOptions): ScrollBarReturnOptions => {
  const {
    v = 'y',
    back,
    indent = 2,
    size = 'md',
    visible,
    enabled = true,
    behavior ='smooth',
    className,
    backClassName,
    thumbClassName,
    container,
  } = options
  const containerRef = useElement(container)
  const optionsRef = useRef<SizeOptions>()
  const startMovePos = useRef<ScrollShift | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const shadowStartRef = useRef<HTMLDivElement>(null)
  const shadowEndRef = useRef<HTMLDivElement>(null)
  const backButtonRef = useRef<HTMLDivElement>(null)
  const isMouseInsideContainer = useRef(false)
  const property = SCROLLBAR_PROPERTY_MAP[v]
  const scrollTrackClassName = cn('scroll-track', {
    [`scroll-track--${v}`]: v,
  }, className)
  const scrollThumbClassName = cn('scroll-thumb', {
    [`scroll-thumb--${v}`]: v,
    [`scroll-thumb--${size}`]: size,
  }, thumbClassName)

  const initOptions = useFunc((container = 0, content = 0, position = 0) => {
    const track = obj.get(trackRef.current, property.height)
    const pages = content / container
    const scrollable = container < content
    const thumb = track / pages
    const thumbPosition = position / (content / track)

    optionsRef.current = {
      pages,
      track,
      thumb,
      thumbPosition,
      scrollable,
    }
  })

  const display = useFunc((ref: React.RefObject<HTMLDivElement>, isVisible: unknown = true) => {
    const state = isVisible ? 'visible' : 'hidden'

    obj.set(ref.current?.style, property.visibility, state)
  })

  const displayScrollbar = useFunc((isMouseInside?: boolean) => {
    // we need to know mouse position
    // for mouse move and scroll events
    if (typeof isMouseInside === 'boolean') {
      isMouseInsideContainer.current = !!isMouseInside
    }

    const hasActiveAction = isMouseInsideContainer.current || !!visible || !!startMovePos.current
    const isVisible = optionsRef.current?.scrollable && hasActiveAction

    display(trackRef, isVisible)
  })

  const refresh = useFunc((container = 0, content = 0, position = 0) => {
    if (!enabled) {
      return
    }

    initOptions(container, content, position)

    // set positions
    obj.set(thumbRef.current?.style, property.size, px(optionsRef.current?.thumb))
    obj.set(thumbRef.current?.style, property.pos, px(optionsRef.current?.thumbPosition))

    displayScrollbar()

    // show back buttons
    display(backButtonRef, back && position >= back)

    // show scroll side shadow
    display(shadowStartRef, position)
    display(shadowEndRef, position + container - content)
  })

  const endMove = useFunc((event: MouseEvent) => {
    event.preventDefault()
    startMovePos.current = null

    displayScrollbar()
  })

  const startMove = useFunc((event: MouseEvent) => {
    event.preventDefault()
    startMovePos.current = obj.get(event, property.mouse)
  })

  const move = useFunc((event: MouseEvent) => {
    if (startMovePos.current && optionsRef.current) {
      const delta = obj.get(event, property.mouse) - startMovePos.current
      const position = delta * optionsRef.current.pages

      startMove(event)
      containerRef.current?.scrollBy({ [property.pos]: position })
    }
  })

  // scroll page
  useEvent('mousedown', startMove, { ref: thumbRef, disable: !enabled })
  useEvent('mousemove', move, { disable: !enabled })
  useEvent('mouseup', endMove, { disable: !enabled })

  const scrollBack = useFunc(() => containerRef.current?.scrollTo({ [property.pos]: 0, behavior }))

  return useMemo(() => !enabled ? null : ({
    display: displayScrollbar,
    refresh,
    shadows: (
      <>
        <div ref={shadowStartRef} className={cn('shadow', `shadow-${v}--start`)} />
        <div ref={shadowEndRef} className={cn('shadow', `shadow-${v}--end`)} />
      </>
    ),
    element: (
      <div ref={trackRef} className={scrollTrackClassName} style={{ [property.margin]: px(indent) }}>
        <div ref={thumbRef} className={scrollThumbClassName} />
      </div>
    ),
    button: (
      <div ref={backButtonRef} className={cn('scroll-back-button', backClassName)}>
        <Button
          size={size}
          start={v === 'x' ? 'keyboard_arrow_left' : 'keyboard_arrow_up'}
          onClick={scrollBack}
          v='outlined'
        />
      </div>
    ),
  }), [
    enabled, v, scrollTrackClassName, property.margin,
    indent, scrollThumbClassName, backClassName, size,
    displayScrollbar, refresh, scrollBack,
  ])
}

export default useScrollBar
