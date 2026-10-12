import React, { useRef } from 'react'
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip'

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


export type PopupSide
  = 'bottom-start' | 'bottom' | 'bottom-end'
  | 'left-start' | 'left' | 'left-end'
  | 'right-start' | 'right' | 'right-end'
  | 'top-start' | 'top' | 'top-end'

export type PopupTriggerOptions = TogglerReturnOptions

export type PopupProps
  = Pick<MuiTooltipProps, 'disableHoverListener'>
  & Pick<BlockProps, 'maxHeight' | 'maxWidth' | 'minWidth' | 'p' | 'g'>
 & {
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

// TODO: add withPopup hoc like withSkeleton
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
export function Popup(props: PopupProps) { // TODO: make actions ad common components via header, footer prop?
  const {
    p = 'xxs xs', g, open, trigger, arrow, title, content, footer, minWidth, maxHeight = 300, maxWidth, side = 'top',
    disableHoverListener, onOpen, onClose, children, className, ...otherProps
  } = props
  const toggler = useToggler(false, { onOn: onOpen, onOff: onClose })
  const isMouseInsideRef = useRef<boolean>(false)

  return (
    <MuiTooltip
      disableHoverListener={disableHoverListener}
      title={(
        <Block
          data-role='dialog'
          radius='xs'
          minWidth={minWidth}
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          className={cn(css.Popup, className)}
          onMouseEnter={() => { isMouseInsideRef.current = true }}
          onMouseLeave={() => { isMouseInsideRef.current = false }}
        >
          {title && (
            <Header className={css.header} p='xs'>
              <Text v='h4' content={title} />
              {disableHoverListener && <Button start='close' size='xxs' onClick={toggler.off} />}
            </Header>
          )}

          <Content p={p} g={g}>
            {mix.fromValOrFunc(content ?? children, toggler)}
          </Content>

          {footer && mix.fromValOrFunc(footer, toggler)}
        </Block>
      )}
      placement={side}
      arrow={arrow}
      open={open ?? toggler.isOn}
      slotProps={{
        tooltip: { className: cn(css.card, arrow && css.arrow) },
      }}
      onOpen={toggler.on}
      onClose={() => {
        if (!isMouseInsideRef.current) {
          toggler.off()
        }
      }}
      {...otherProps}
    >
      {mix.fromValOrFunc(trigger, toggler)}
    </MuiTooltip>
  )
}

Popup.displayName = 'Popup'

export default Popup
