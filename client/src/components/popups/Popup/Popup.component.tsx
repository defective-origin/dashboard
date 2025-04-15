import React, { useRef } from 'react'
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip'

// ---| core |---
import { cn, mix } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Text from 'components/views/Text'
import Scroll from 'components/layouts/Scroll'
import Layout from 'components/layouts/Layout'
import Content from 'components/layouts/Content'
import Footer from 'components/layouts/Footer'
import ButtonGroup from 'components/actions/ButtonGroup'
import Header from 'components/layouts/Header'
import Button, { ButtonProps } from 'components/actions/Button'

// ---| self |---
import css from './Popup.module.scss'
import { TogglerReturnOptions, useToggler } from 'hooks'

const POPUP_STYLE = { tooltip: { style: { background: 'var(--card-background)', padding: 0, border: 'var(--border)', boxShadow: 'var(--box-shadow)' } } }
const POPUP_WITHOUT_ARROW_STYLE = { tooltip: { style: { margin: 0, ...POPUP_STYLE.tooltip.style } } }


export type PopupVariant =
| 'bottom-start' | 'bottom' | 'bottom-end'
| 'left-start' | 'left' | 'left-end'
| 'right-start' | 'right' | 'right-end'
| 'top-start' | 'top' | 'top-end'

export type PopupTriggerOptions = TogglerReturnOptions

export type PopupProps = Pick<MuiTooltipProps, 'disableHoverListener'> & {
  open?: boolean;
  arrow?: boolean
  title?: React.ReactNode
  actions?: mix.ValOrFunc<ButtonProps[], [PopupTriggerOptions]>
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
 *
 * How to use
 * @example
 * <Popup
 *   title={t('LABEL.SCREENS')?.toUpperCase()}
 *   actions={[
 *     { content: t('ACTION.SAVE'), color: 'success', onClick: () => onSave?.(sizes) },
 *     { content: t('ACTION.CANCEL'), onClick: onCancel },
 *   ]}
 *   trigger={(options) => (
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
    open, trigger, arrow, title, content, actions, maxHeight = 300, maxWidth, v = 'top',
    disableHoverListener, onOpen, onClose, children, className, ...otherProps
  } = props
  const _className = cn(css.Popup, className)
  const toggler = useToggler()
  const isMouseInsideRef = useRef<boolean>(false)

  const close = () => {
    toggler.off()
    onClose?.()
  }

  return (
    <MuiTooltip
      className={_className}
      disableHoverListener={disableHoverListener}
      title={(
        <Layout
          v='tcb'
          // g='xxs'
          p='xxs'
          maxHeight={maxHeight}
          maxWidth={maxWidth}
          onMouseEnter={() => { isMouseInsideRef.current = true }}
          onMouseLeave={() => { isMouseInsideRef.current = false }}
        >
          {title && (
            <Header>
              <Text content={title} size='xs' />
              {disableHoverListener && <Button start='close' size='xxs' onClick={close} />}
            </Header>
          )}

          <Content>
            <Text size='xxs' content={mix.fromValOrFunc(content, toggler)} />
            {mix.fromValOrFunc(children, toggler)}
          </Content>

          {actions && (
            <Footer>
              <ButtonGroup
                className={css.PopupActions}
                items={mix.fromValOrFunc(actions, toggler).map(item => ({ ...item, size: 'xxs' }))}
              />
            </Footer>
          )}
        </Layout>
      )}
      placement={v}
      arrow={arrow}
      open={open ?? toggler.isOn}
      componentsProps={arrow ? POPUP_STYLE : POPUP_WITHOUT_ARROW_STYLE}
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
