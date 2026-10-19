import React, { useRef, isValidElement, cloneElement } from 'react'
import {
  arrow as arrowUi, autoUpdate, flip, FloatingArrow, FloatingPortal, offset, shift, useFloating,
  useFocus, useHover, useInteractions, useRole, useDismiss, safePolygon, Placement,
} from '@floating-ui/react'

// ---| core |---
import { cn, mix } from 'tools'
import { TogglerReturnOptions, useToggler } from 'hooks'

// ---| components |---
import Text from 'components/views/Text'
import Block, { BlockProps } from 'components/layouts/Block'
import Header from 'components/layouts/Header'
import Content from 'components/layouts/Content'
import Button from 'components/actions/Button'

// ---| self |---
import css from './Popup.module.scss'


export type PopupSide = Placement
export type PopupTriggerOptions = TogglerReturnOptions
export type PopupProps
  = Pick<BlockProps, 'maxHeight' | 'maxWidth' | 'minWidth' | 'p' | 'g'>
  & {
    role?: 'dialog' | 'menu' | 'tooltip'
    disableHover?: boolean
    side?: PopupSide
    open?: boolean
    arrow?: boolean
    title?: React.ReactNode
    className?: string
    content?: mix.ValOrFunc<React.ReactNode, [PopupTriggerOptions]>
    children?: mix.ValOrFunc<React.ReactNode, [PopupTriggerOptions]>
    footer?: mix.ValOrFunc<React.ReactNode, [PopupTriggerOptions]>
    trigger?: mix.ValOrFunc<React.ReactElement, [PopupTriggerOptions]>
    onOpen?: () => void
    onClose?: () => void
  }

/**
 * Component description.
 * @example
 * <Popup
 *   title={t('LABEL.SCREENS')?.toUpperCase()}
 *   footer={o => [
 *     <Button content={t('ACTION.SAVE')} start='save' color='success' onClick={() => onSave?.(sort(Object.values(enabled)))} />,
 *     <Button content={t('ACTION.CLOSE')} start='close' color='primary' onClick={o.off} />,
 *   ]}
 *   trigger={options => (
 *      <Button
 *        active={options.isOn}
 *        onClick={options.on}
 *        onMouseEnter={options.on}
 *        onMouseLeave={options.off}
 *      />
 *   )}
 * >
 *  Popup Content
 * </Popup>
 */
export function Popup(props: PopupProps) {
  const {
    p = 'xs', g, open, trigger, arrow, title, content, footer, minWidth, maxHeight = 300, maxWidth, side = 'top',
    disableHover, role = 'tooltip', onOpen, onClose, children, className, ...otherProps
  } = props
  const toggler = useToggler(open, { onOn: onOpen, onOff: onClose })
  const arrowRef = useRef<SVGSVGElement | null>(null)

  const { refs, floatingStyles, context } = useFloating({
    placement: side,
    open: toggler.isOn,
    onOpenChange: value => {
      if (value) {
        toggler.on()
      } else {
        toggler.off()
      }
    },
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(arrow ? 8 : 0),
      flip(),
      shift({ padding: 8 }),
      // eslint-disable-next-line react-hooks/refs
      arrowUi({ element: arrowRef }),
    ],
  })

  const hover = useHover(context, {
    enabled: !disableHover,
    move: false,
    delay: { open: 100, close: 0 },
    handleClose: safePolygon(),
  })

  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const roles = useRole(context, { role })
  const interactions = useInteractions([hover, focus, dismiss, roles])
  const triggerItem = mix.fromValOrFunc(trigger, toggler)

  if (!isValidElement<object>(triggerItem)) {
    return null
  }


  return (
    <>
      {cloneElement(
        triggerItem,
        interactions.getReferenceProps({
          ref: refs.setReference,
          ...triggerItem.props,
        }),
      )}

      {toggler.isOn && (
        <FloatingPortal>
          <Block
            ref={refs.setFloating}
            style={{ ...floatingStyles, zIndex: 1500 }}
            {...interactions.getFloatingProps()}
            radius='xs'
            minWidth={minWidth}
            maxHeight={maxHeight}
            maxWidth={maxWidth}
            className={cn(css.Popup, className)}
            {...otherProps}
          >
            {title && (
              <Header className={css.header} p='xs'>
                <Text v='h5' size='xxs' content={title} />
                {disableHover && <Button start='close' size='xxs' onClick={toggler.off} />}
              </Header>
            )}

            <Content p={p} g={g}>
              {mix.fromValOrFunc(content ?? children, toggler)}
            </Content>

            {footer && mix.fromValOrFunc(footer, toggler)}

            {arrow && <FloatingArrow className={css.arrow} ref={arrowRef} context={context} />}
          </Block>
        </FloatingPortal>
      )}
    </>
  )
}

Popup.displayName = 'Popup'

export default Popup
