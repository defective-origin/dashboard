import React, { useCallback, useImperativeHandle } from 'react'

// ---| components |---
import Box, { BoxProps } from 'components/Box'
import Button from 'components/Button'
import Backdrop from 'components/Backdrop'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Scroll.module.scss'
import { ScrollManager, ScrollUIProps, useScrollManager, useScrollUIProps } from './hooks'

export type ScrollProps = BoxProps & ScrollUIProps & {
  // show navigation buttons after scrolling
  buttons?: boolean
  // subscription on manager
  manager?: React.MutableRefObject<ScrollManager<HTMLDivElement> | null>
  // extra components which is injected into container
  extra?: React.ReactNode
  // hovering title for up button
  upBtnTitle?: string
  // hovering title for left button
  leftBtnTitle?: string
  showButtonsOn?: number
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
 *       upBtnTitle="Back to start of page"
 *       leftBtnTitle="Back to left side of page"
 *       direction="xy"
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
    ui,
    upBtnTitle,
    leftBtnTitle,
    buttons,
    extra,
    manager,
    showButtonsOn = 50,
    children,
    className,
    ...otherProps
  } = useScrollUIProps(props)

  // TODO: fix manager type in buildHookWithOptionalRef
  //  TODO: add  shift scroll  from border on 10  px
  const [ref, scrollManager] = useScrollManager<HTMLDivElement>()
  const backToTop = useCallback(() => scrollManager.moveTop(), [scrollManager])
  const backToLeft = useCallback(() => scrollManager.moveLeft(), [scrollManager])
  const showLeftButton = showButtonsOn < scrollManager.options.left
  const showUpButton = showButtonsOn < scrollManager.options.top
  const _className = cn(css.Scroll, props.className)
  const scrollClassName = cn(css.Content, className)

  // subscription on scroll manager
  useImperativeHandle(manager, () => scrollManager as ScrollManager<HTMLDivElement>, [manager, scrollManager])

  return (
    <Box className={_className} stretch="xy" position="relative" {...otherProps}>
      <div className={scrollClassName} ref={ref}>
        {children}
      </div>

      <Backdrop className={css.ButtonContainer} open={buttons}>
        <Backdrop.Item placement="start-end">
          {showUpButton && (
            <Button size={ui.size} icon="keyboard_arrow_up" title={upBtnTitle} onClick={backToTop} />
          )}

          {showLeftButton && (
            <Button size={ui.size} icon="keyboard_arrow_left" title={leftBtnTitle} onClick={backToLeft} />
          )}
        </Backdrop.Item>
      </Backdrop>

      {extra}
    </Box>
  )
}
