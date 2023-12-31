import React, { useImperativeHandle } from 'react'

// ---| components |---
import Button from 'components/Button'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Scroll.module.scss'
import { Scroll, useScroll } from './Scroll.hook'

export type ScrollSizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ScrollDirectionType = 'x' | 'y' | 'xy'

export type ScrollProps = {
  className?: string
  contentClassName?: string
  children?: React.ReactNode
  size?: ScrollSizeType
  direction?: ScrollDirectionType
  // show navigation buttons after scrolling
  buttons?: boolean
  // subscription on manager
  manager?: React.MutableRefObject<Scroll<HTMLDivElement> | null>
  // extra components which is injected into container
  extra?: React.ReactNode
  showButtonsOn?: number
  buttonsStyle?: React.CSSProperties
}

/**
 * Scroll which allow to scroll by buttons.
 * @example
 * export default function App(): JSX.Element {
 *   const managerRef = useRef<ScrollManager>(null)
 *
 *   return (
 *     <Scroll
 *       manager={managerRef}
 *       upBtnTitle='Back to start of page'
 *       leftBtnTitle='Back to left side of page'
 *       direction='xy'
 *       buttons
 *     >
 *       <div style={{
 *         width: 5000,
 *         height: 5000,
 *       }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis, magnam.</div>
 *     </Scroll>
 *   )
 * }
 */
export default function Scroll(props: ScrollProps): JSX.Element {
  const {
    size = 'md',
    direction = 'xy',
    buttons,
    extra,
    manager,
    showButtonsOn = 50,
    buttonsStyle,
    children,
    className,
    contentClassName,
    ...otherProps
  } = props
  const _className = cn(css.Scroll, className)
  const _contentClassName = cn(css.Content, `scroll-${direction}`, `scroll--${size}`, contentClassName)
  const scrollManager = useScroll<HTMLDivElement>()
  const showLeftButton = showButtonsOn < scrollManager.options.left
  const showUpButton = showButtonsOn < scrollManager.options.top

  // subscription on scroll manager
  useImperativeHandle(manager, () => scrollManager, [scrollManager])

  return (
    <div className={_className} {...otherProps}>
      <div className={_contentClassName} ref={scrollManager.ref}>
        {children}
      </div>

      {buttons && (
        <div className={css.Actions} style={buttonsStyle}>
          {showUpButton && (
            <Button
              size='xl'
              start='keyboard_arrow_up'
              onClick={scrollManager.moveStartY}
            />
          )}

          {showLeftButton && (
            <Button
              size='xl'
              start='keyboard_arrow_left'
              onClick={scrollManager.moveStartX}
            />
          )}
        </div>
      )}

      {extra}
    </div>
  )
}
