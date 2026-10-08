import React, { useRef } from 'react'
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip'

// ---| core |---
import { cn, mix } from 'tools'
import { TogglerReturnOptions, useToggler } from 'hooks'

// ---| components |---
import Text from 'components/views/Text'
import Block from 'components/layouts/Block'
import Header from 'components/layouts/Header'
import Footer from 'components/layouts/Footer'
import Content from 'components/layouts/Content'
import Button from 'components/actions/Button'

// ---| self |---
import css from './Popup.module.scss'


export type PopupVariant
  = 'bottom-start' | 'bottom' | 'bottom-end'
  | 'left-start' | 'left' | 'left-end'
  | 'right-start' | 'right' | 'right-end'
  | 'top-start' | 'top' | 'top-end'

export type PopupTriggerOptions = TogglerReturnOptions

export type PopupProps = Pick<MuiTooltipProps, 'disableHoverListener'> & {
  open?: boolean
  arrow?: boolean
  title?: React.ReactNode
  footer?: mix.ValOrFunc<React.ReactNode, [PopupTriggerOptions]>
  v?: PopupVariant
  maxHeight?: number
  maxWidth?: number
  className?: string
  content?: mix.ValOrFunc<React.ReactNode, [PopupTriggerOptions]>
  children?: mix.ValOrFunc<React.ReactNode, [PopupTriggerOptions]>
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
    open, trigger, arrow, title, content, footer, maxHeight = 300, maxWidth, v = 'top',
    disableHoverListener, onOpen, onClose, children, className, ...otherProps
  } = props
  const toggler = useToggler()
  const isMouseInsideRef = useRef<boolean>(false)

  const close = () => {
    toggler.off()
    onClose?.()
  }

  return (
    <MuiTooltip
      disableHoverListener={disableHoverListener}
      title={(
        <Block
          data-role='dialog'
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          className={cn(css.Popup, className)}
          onMouseEnter={() => { isMouseInsideRef.current = true }}
          onMouseLeave={() => { isMouseInsideRef.current = false }}
        >
          {title && (
            <Header className={css.header} p='xs'>
              <Text v='h5' content={title} />
              {disableHoverListener && <Button start='close' size='xxs' onClick={close} />}
            </Header>
          )}

          <Content p='xs'>
            {mix.fromValOrFunc(content ?? children, toggler)}
          </Content>

          {footer && (
            <Footer>
              {mix.fromValOrFunc(footer, toggler)}
            </Footer>
          )}
        </Block>
      )}
      placement={v}
      arrow={arrow}
      open={open ?? toggler.isOn}
      slotProps={{
        tooltip: { className: cn(css.card, arrow && css.arrow) },
      }}
      onOpen={() => {
        toggler.on()
        onOpen?.()
      }}
      onClose={() => {
        if (!isMouseInsideRef.current) {
          close()
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
