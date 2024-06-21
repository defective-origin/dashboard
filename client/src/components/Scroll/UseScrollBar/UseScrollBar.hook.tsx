import React, { useMemo, useRef } from 'react'

// ---| core |---
import { cn } from 'tools'
import { Direction, Size } from 'theme'
import { useElement, ElementOptions, useEvent, useFunc } from 'hooks'

// ---| components |---
import Button from 'components/Button'

// ---| self |---
import './UseScrollBar.module.scss'

export const px = (value: string | number = 0) => `${value}px`
export const set = <T extends object>(obj: T | undefined | null, key: string, value: T[keyof T]) => obj && (obj[key as keyof T] = value)
export const get = <T extends object>(obj: T | undefined | null, key: string): any => obj && obj[key as keyof T]

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
  hide: () => void
  show: () => void
  resize: (_container?: number, _content?: number, shift?: number) => void
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
  const property = SCROLLBAR_PROPERTY_MAP[v]
  const scrollTrackClassName = cn('scroll-track', {
    [`scroll-track--${v}`]: v,
  }, className)
  const scrollThumbClassName = cn('scroll-thumb', {
    [`scroll-thumb--${v}`]: v,
    [`scroll-thumb--${size}`]: size,
  }, thumbClassName)

  const isEnabled = useFunc(() => optionsRef.current?.scrollable && enabled)

  const show = useFunc(() => optionsRef.current?.scrollable && set(trackRef.current?.style, property.visibility, 'visible'))
  const hide = useFunc(() => !startMovePos.current && set(trackRef.current?.style, property.visibility, 'hidden'))

  const initOptions = useFunc((container = 0, content = 0, position = 0) => {
    const track = get(trackRef.current, property.height)
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

  const showShadow = useFunc((ref: React.RefObject<HTMLDivElement>, position = 0) => {
    if (position === 0) {
      set(ref.current?.style, property.visibility, 'hidden')
    } else {
      set(ref.current?.style, property.visibility, 'visible')
    }
  })

  const resize = useFunc((container = 0, content = 0, position = 0) => {
    // show/hide back buttons
    if (back && position >= back) {
      set(backButtonRef.current?.style, property.visibility, 'visible')
    } else {
      set(backButtonRef.current?.style, property.visibility, 'hidden')
    }

    initOptions(container, content, position)

    if (!isEnabled()) {
      return hide()
    } else if (startMovePos.current || visible) {
      show()
    }

    set(thumbRef.current?.style, property.size, px(optionsRef.current?.thumb))
    set(thumbRef.current?.style, property.pos, px(optionsRef.current?.thumbPosition))

    // show scroll side shadow
    showShadow(shadowStartRef, position)
    showShadow(shadowEndRef, position + container - content)
  })

  const endMove = useFunc(() => {
    if (isEnabled()) {
      startMovePos.current = null
    }
  })

  const startMove = useFunc((event: MouseEvent) => {
    if (isEnabled()) {
      startMovePos.current = get(event, property.mouse)
      event.preventDefault()
    }
  })

  const move = useFunc((event: MouseEvent) => {
    if (isEnabled() && startMovePos.current && optionsRef.current) {
      const delta = get(event, property.mouse) - startMovePos.current
      const position = delta * optionsRef.current.pages

      startMove(event)
      containerRef.current?.scrollBy({ [property.pos]: position })
    }
  })

  // scroll page
  useEvent('mousedown', startMove, { ref: thumbRef })
  useEvent('mousemove', move)
  useEvent('mouseup', endMove)

  const scrollBack = useFunc(() => {
    containerRef.current?.scrollTo({ [property.pos]: 0, behavior })
  })

  return useMemo(() => !enabled ? null : ({
    hide,
    show,
    resize,
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
  }), [enabled, hide, show, resize, scrollTrackClassName, property.margin, indent, scrollThumbClassName, backClassName, size, v, scrollBack])
}

export default useScrollBar
