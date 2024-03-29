import React, { useCallback, useEffect, useMemo, useRef } from 'react'

// ---| core |---
import { cn } from 'tools'
import { Direction, Size } from 'theme'

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
  margin?: number
  /**  Selector of scrollable container. If not passed then takes first parent node. */
  container?: () => HTMLElement | null | undefined
}

export type ScrollBarReturnOptions = null | {
  hide: () => void
  show: () => void
  resize: (_container?: number, _content?: number, shift?: number) => void
  element: JSX.Element | boolean
  button: JSX.Element | boolean
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
    margin = 0,
    size = 'md',
    visible,
    enabled = true,
    behavior ='smooth',
    className,
    backClassName,
    thumbClassName,
    container = () => null,
  } = options
  const scrollTrackClassName = cn('scroll-track', {
    [`scroll-track--${v}`]: v,
  }, className)
  const scrollThumbClassName = cn('scroll-thumb', {
    [`scroll-thumb--${v}`]: v,
    [`scroll-thumb--${size}`]: size,
  }, thumbClassName)
  const optionsRef = useRef<SizeOptions>()
  const startMovePos = useRef<ScrollShift | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const backButtonRef = useRef<HTMLDivElement>(null)
  const property = SCROLLBAR_PROPERTY_MAP[v]

  const isEnabled = useCallback(() => optionsRef.current?.scrollable && enabled, [enabled])

  const show = useCallback(() => optionsRef.current?.scrollable && set(trackRef.current?.style, property.visibility, 'visible'), [property.visibility])
  const hide = useCallback(() => !startMovePos.current && set(trackRef.current?.style, property.visibility, 'hidden'), [property.visibility])

  const initOptions = useCallback((container = 0, content = 0, position = 0) => {
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
  }, [property.height])

  const resize = useCallback((container = 0, content = 0, position = 0) => {
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
  }, [back, hide, initOptions, isEnabled, property.pos, property.size, property.visibility, show, visible])

  const endMove = useCallback(() => startMovePos.current = null, [])

  const startMove = useCallback((event: MouseEvent) => {
    startMovePos.current = get(event, property.mouse)
    event.preventDefault()
  }, [property.mouse])

  const move = useCallback((event: MouseEvent) => {
    if (startMovePos.current && optionsRef.current) {
      const delta = get(event, property.mouse) - startMovePos.current
      const position = delta * optionsRef.current.pages

      startMove(event)
      container()?.scrollBy({ [property.pos]: position })
    }
  }, [container, property.mouse, property.pos, startMove])

  // scroll page
  useEffect(() => {
    if (isEnabled()) {
      thumbRef.current?.addEventListener('mousedown', startMove)
      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', endMove)

      return function cleanup() {
        thumbRef.current?.removeEventListener('mousedown', startMove)
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', endMove)
      }
    }
  }, [endMove, isEnabled, move, startMove])

  const scrollBack = useCallback(() => {
    container()?.scrollTo({ [property.pos]: 0, behavior })
  }, [behavior, container, property.pos])

  return useMemo(() => !enabled ? null : ({
    hide,
    show,
    resize,
    element: (
      <div ref={trackRef} className={scrollTrackClassName} style={{ [property.margin]: px(margin) }}>
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
  }), [enabled, hide, show, resize, scrollTrackClassName, property.margin, margin, scrollThumbClassName, backClassName, size, v, scrollBack])
}

export default useScrollBar
