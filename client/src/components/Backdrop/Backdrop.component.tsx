import React, { useCallback, useEffect } from 'react'

// ---| components |---
import Box, { BoxProps } from 'components/Box'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Backdrop.module.scss'
import BackdropItem from './BackdropItem'

const BackdropAttachTypeMap = {
  window: 'fixed',
  block: 'absolute',
} as const

export type BackdropAttachTypes = keyof typeof BackdropAttachTypeMap

export type BackdropProps = BoxProps & {
  // should backdrop be visible and clickable
  visible?: boolean
  // where backdrop should be attached
  attach?: BackdropAttachTypes
  onClose?: () => void
}

/**
 * Backdrop allows to place content under another content.
 * @example
 * <Backdrop align="center" attach="window" visible open>
 *   content
 * </Backdrop>
 */
export default function Backdrop(props: BackdropProps): JSX.Element | null {
  const {
    visible,
    attach = 'window',
    onClose,
    className,
    children,
    ...otherProps
  } = props
  const _className = cn(
    css.Backdrop, {
      [css.Visible]: visible,
    }, className,
  )

  const handleButtonPress = useCallback((event: KeyboardEvent | React.KeyboardEvent) => {
    // prevent tab navigation
    if (event.code === 'Tab') {
      event.preventDefault()

    // close on ESC press
    } else if (event.code === 'Escape' && onClose) {
      onClose()
    }

    event.stopPropagation()
  }, [onClose])

  const closeBackdrop = useCallback((event: MouseEvent | React.MouseEvent) => {
    event.stopPropagation()

    if (onClose) {
      onClose()
    }
  }, [onClose])

  // FIXME: click rise several close events
  // subscribe on click outside
  useEffect(() => {
    window.addEventListener('mouseup', closeBackdrop)
    window.addEventListener('keydown', handleButtonPress)

    return function cleanup() {
      window.removeEventListener('mouseup', closeBackdrop)
      window.removeEventListener('keydown', handleButtonPress)
    }
  }, [closeBackdrop, handleButtonPress])

  return (
    <Box
      className={_className}
      position={BackdropAttachTypeMap[attach]}
      placement="stretch"
      stretch="xy"
      onKeyDown={handleButtonPress}
      onMouseUp={closeBackdrop}
      {...otherProps}
    >
      {children}
    </Box>
  )
}

Backdrop.Item = BackdropItem
