import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Color } from 'theme'

// ---| components |---
import Text from 'components/views/Text'
import Block from 'components/layouts/Block'
import Actions from 'components/layouts/Actions'
import { Icon, IconVariant } from 'components/views/Icon'

// ---| self |---
import css from './Alert.module.scss'


export const ALERT_ICON_MAP: Partial<Record<AlertVariant, IconVariant>> = {
  success: 'check',
  info: 'info',
  warning: 'warning',
  error: 'error',
}

export type AlertVariant = Extract<Color, 'success' | 'info' | 'warning' | 'error'>

export type AlertProps = {
  v?: AlertVariant
  inline?: boolean
  clear?: boolean
  title?: React.ReactNode
  actions?: React.ReactNode
  className?: string
  content?: React.ReactNode
  children?: React.ReactNode
}

/**
 * A notification in order to show some message.
 * @example
 * <Alert />
 */
export function Alert(props: AlertProps) {
  const { title, v = 'info', inline, clear, content, actions, children = content, className, ...otherProps } = props

  return (
    <Block className={cn(css.Alert, className)} v='x' p='sm' g='sm' bg={!clear ? `${v}-6` : undefined} {...otherProps}>
      <Icon v={ALERT_ICON_MAP[v]} color={v} size='md' />

      <Block g='xs'>
        {title && <Text v='h5' size='sm' content={title} />}

        <Block p='xxs' g='xs' v={inline ? 'x' : 'y'} aligns={inline ? 'center' : 'end'}>
          <Text size='xs' content={children} />
          {actions && <Actions size='sm' v='x' g='xs' justifies='end' action='outlined'>{actions}</Actions>}
        </Block>
      </Block>
    </Block>
  )
}

Alert.displayName = 'Alert'

export default Alert
