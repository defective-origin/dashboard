import { useCallback, useState, useEffect, useMemo } from 'react'

// ---| common |---
import { buildHookWithOptionalRef } from 'common/hooks'

export const DEFAULT_SCROLL_PARAMS: ScrollToOptions = {
  top: 0,
  left: 0,
  behavior: 'smooth',
}

export type ScrollFunc = (coordY?: number, coordX?: number, behavior?: ScrollBehavior) => void
export type ScrollPartFunc = (coord?: number, behavior?: ScrollBehavior) => void
export type ScrollIntoViewFunc = (id: string, arg?: boolean | ScrollIntoViewOptions) => void

export type ScrollOptions = {
  width: number,
  height: number,
  left: number,
  top: number,
  offsetWidth: number,
  offsetHeight: number,
}

export const DEFAULT_SCROLL_OPTIONS: ScrollOptions = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  offsetWidth: 0,
  offsetHeight: 0,
}

export type ScrollManager<TElement extends HTMLElement> = {
  elem: TElement | null,
  options: ScrollOptions,
  move: ScrollFunc
  moveTop: ScrollPartFunc
  moveLeft: ScrollPartFunc
  moveBy: ScrollFunc
  moveTopBy: ScrollPartFunc
  moveLeftBy: ScrollPartFunc
  moveIntoView: ScrollIntoViewFunc
}

export function useScrollManagerWithoutRef<TElement extends HTMLElement>(
  ref: React.MutableRefObject<TElement | null>,
  defaultParams = DEFAULT_SCROLL_PARAMS,
): ScrollManager<TElement> {
  const params: ScrollToOptions = { ...DEFAULT_SCROLL_PARAMS, ...defaultParams }
  const [options, setOptions] = useState<ScrollOptions>(DEFAULT_SCROLL_OPTIONS)

  const move = useCallback<ScrollFunc>((top = params.top, left = params.left, behavior = params.behavior) => {
    ref.current?.scrollTo({ top, left, behavior })
  }, [])

  const moveTop = useCallback<ScrollPartFunc>((top = params.top, behavior = params.behavior) => {
    ref.current?.scrollTo({ top, behavior })
  }, [])

  const moveLeft = useCallback<ScrollPartFunc>((left = params.left, behavior = params.behavior) => {
    ref.current?.scrollTo({ left, behavior })
  }, [])

  const moveBy = useCallback<ScrollFunc>((top = params.top, left = params.left, behavior = params.behavior) => {
    ref.current?.scrollBy({ top, left, behavior })
  }, [])

  const moveTopBy = useCallback<ScrollPartFunc>((top = params.top, behavior = params.behavior) => {
    ref.current?.scrollBy({ top, behavior })
  }, [])

  const moveLeftBy = useCallback<ScrollPartFunc>((left = params.left, behavior = params.behavior) => {
    ref.current?.scrollBy({ left, behavior })
  }, [])

  const moveIntoView = useCallback<ScrollIntoViewFunc>((
    idOrElem: string | HTMLElement,
    arg?: boolean | ScrollIntoViewOptions,
  ) => {
    const nestedElem = typeof idOrElem === 'string' ? ref.current?.querySelector(`#${idOrElem}`) : idOrElem

    nestedElem?.scrollIntoView(arg)
  }, [])

  const buildOptions = useCallback((elem: TElement | null): ScrollOptions => {
    if (!elem) {
      return DEFAULT_SCROLL_OPTIONS
    }

    return {
      width: elem.scrollWidth,
      height: elem.scrollHeight,
      left: elem.scrollLeft,
      top: elem.scrollTop,
      offsetWidth: elem.offsetWidth,
      offsetHeight: elem.offsetHeight,
    }
  }, [])

  const onScroll = useCallback((e: Event) => setOptions(buildOptions(e.target as TElement)), [])

  useEffect(() => {
    ref.current?.addEventListener('scroll', onScroll, false)

    setOptions(buildOptions(ref.current))

    return function cleanup() {
      ref.current?.removeEventListener('scroll', onScroll, false)
    }
  }, [ref.current])

  const manager: ScrollManager<TElement> = useMemo(() => ({
    elem: ref.current,
    options,
    move,
    moveTop,
    moveLeft,
    moveIntoView,
    moveBy,
    moveTopBy,
    moveLeftBy,
  }), [options, move, moveTop, moveLeft, moveIntoView, moveBy, moveTopBy, moveLeftBy])

  return manager
}

export const useScrollManager = buildHookWithOptionalRef(useScrollManagerWithoutRef)
