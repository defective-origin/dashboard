import React, { useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react'

// ---| components |---
import Button from 'components/Button'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import './UseScroll.module.scss'

export type ScrollActionOffset = {
  x: number
  y: number
}

export type ScrollActionOptions = {
  offset?: ScrollActionOffset
  shift?: ScrollActionOffset
}

export const DEFAULT_SCROLL_ACTION_OPTIONS: Required<ScrollActionOptions> = {
  offset: { x: 50, y: 50 },
  shift: { x: 50, y: 50 },
}

export type ScrollSizeType = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type ScrollDirectionType = 'x' | 'y' | 'xy'

export const DEFAULT_SCROLL_PARAMS: ScrollToOptions = { top: 0, left: 0, behavior: 'smooth' }

export type ScrollFunc = (coordY?: number, coordX?: number, behavior?: ScrollBehavior) => void
export type ScrollPartFunc = (coord?: number, behavior?: ScrollBehavior) => void
export type ScrollIntoViewFunc = (id: string, arg?: boolean | ScrollIntoViewOptions) => void

export type ScrollManager<TElement extends HTMLElement> = {
  ref: React.MutableRefObject<TElement>
  move: ScrollFunc
  moveTop: ScrollPartFunc
  moveLeft: ScrollPartFunc
  moveBy: ScrollFunc
  moveTopBy: ScrollPartFunc
  moveLeftBy: ScrollPartFunc
  moveIntoView: ScrollIntoViewFunc
  moveStartX: () => void
  moveEndX: () => void
  moveStartY: () => void
  moveEndY: () => void
}

export type ScrollOptions<TElement extends HTMLElement> = ScrollToOptions & {
  enable?: boolean
  ref?: React.MutableRefObject<TElement>
  size?: ScrollSizeType
  direction?: ScrollDirectionType

  // show navigation buttons after scrolling
  buttons?: true | ScrollActionOptions

  // subscription on scroll manager
  manager?: React.MutableRefObject<ScrollManager<TElement>>
}

export type ScrollReturnOptions<TElement extends HTMLElement> = {
  ref: React.MutableRefObject<TElement>
  elements: React.ReactNode
  manager: ScrollManager<TElement>
}


/**
 * Hook descriptions
 *
 * @example
 * const options = useScroll(conf)
 */
export function useScroll<TElement extends HTMLElement>(_options?: ScrollOptions<TElement>): ScrollReturnOptions<TElement> {
  const options = { ...DEFAULT_SCROLL_PARAMS, ..._options }
  const ref = useRef<TElement>(options.ref?.current as TElement)

  const move = useCallback<ScrollFunc>((top = options?.top, left = options?.left, behavior = options?.behavior) => {
    ref.current?.scrollTo({ top, left, behavior })
  }, [options?.behavior, options?.left, options?.top])

  const moveTop = useCallback<ScrollPartFunc>((top = options?.top, behavior = options?.behavior) => {
    ref.current?.scrollTo({ top, behavior })
  }, [options?.behavior, options?.top])

  const moveLeft = useCallback<ScrollPartFunc>((left = options?.left, behavior = options?.behavior) => {
    ref.current?.scrollTo({ left, behavior })
  }, [options?.behavior, options?.left])

  const moveBy = useCallback<ScrollFunc>((top = options?.top, left = options?.left, behavior = options?.behavior) => {
    ref.current?.scrollBy({ top, left, behavior })
  }, [options?.behavior, options?.left, options?.top])

  const moveTopBy = useCallback<ScrollPartFunc>((top = options?.top, behavior = options?.behavior) => {
    ref.current?.scrollBy({ top, behavior })
  }, [options?.behavior, options?.top])

  const moveLeftBy = useCallback<ScrollPartFunc>((left = options?.left, behavior = options?.behavior) => {
    ref.current?.scrollBy({ left, behavior })
  }, [options?.behavior, options?.left])

  const moveIntoView = useCallback<ScrollIntoViewFunc>((
    idOrElem: string | HTMLElement,
    arg?: boolean | ScrollIntoViewOptions,
  ) => {
    const nestedElem = typeof idOrElem === 'string' ? ref.current?.querySelector(`#${idOrElem}`) : idOrElem

    nestedElem?.scrollIntoView(arg)
  }, [ref])

  const moveStartX = useCallback(() => moveTop(0), [moveTop])
  const moveEndX = useCallback(() => moveTop(ref.current.scrollWidth), [moveTop, ref])
  const moveStartY = useCallback(() => moveLeft(0), [moveLeft])
  const moveEndY = useCallback(() => moveLeft(ref.current.scrollHeight), [moveLeft, ref])

  const onScroll = useCallback((e: Event) => {
    // move scroll divs e.target as TElement
  }, [])

  useEffect(() => {
    if (!options.enable) {
      return
    }

    const className = cn('scroll', `scroll--${options.direction}`)

    ref.current.addEventListener('scroll', onScroll, false)
    ref.current.classList.add(className)

    return function cleanup() {
      ref.current.removeEventListener('scroll', onScroll, false)
      ref.current.classList.remove(className)
    }
  }, [onScroll, options.direction, options.enable, options.size])

  const manager = useMemo(() => ({
    ref,
    move,
    moveTop,
    moveLeft,
    moveIntoView,
    moveBy,
    moveTopBy,
    moveLeftBy,
    moveStartX,
    moveEndX,
    moveStartY,
    moveEndY,
  }), [ref, move, moveTop, moveLeft, moveIntoView, moveBy, moveTopBy, moveLeftBy, moveStartX, moveEndX, moveStartY, moveEndY])

  // subscription on scroll manager
  useImperativeHandle(options?.manager, () => manager, [manager])


  const actionOptions = { ...DEFAULT_SCROLL_ACTION_OPTIONS, ...options.buttons === true ? {} : options.buttons }
  const actionShift = { left: actionOptions.offset.x, bottom: actionOptions.offset.y }
  const showLeftButton = actionOptions.offset.x < ref.current.scrollLeft
  const showUpButton = actionOptions.offset.y < ref.current.scrollTop
  const hasHorizontalScrollbar = ref.current.scrollWidth > ref.current.clientWidth
  const hasVerticalScrollbar = ref.current.scrollHeight > ref.current.clientHeight

  const elements = (
    <>
      {hasHorizontalScrollbar && <div className={cn('scroll-bar-thumb', 'scroll-bar-thumb--x', `scroll-bar-thumb--${options.size}`)} />}
      {hasVerticalScrollbar && <div className={cn('scroll-bar-thumb', 'scroll-bar-thumb--y', `scroll-bar-thumb--${options.size}`)} />}

      {options.buttons && (
        <div className='scroll-actions' style={actionShift}>
          {showUpButton && (
            <Button
              size='xl'
              start='keyboard_arrow_up'
              onClick={moveStartY}
            />
          )}

          {showLeftButton && (
            <Button
              size='xl'
              start='keyboard_arrow_left'
              onClick={moveStartX}
            />
          )}
        </div>
      )}
    </>
  )


  return {
    ref,
    elements,
    manager,
  }
}

export default useScroll
