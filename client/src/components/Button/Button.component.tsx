import React from 'react'

// ---| components |---
import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd'
import Text, { TextProps } from 'components/Text'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Button.module.scss'

const ButtonSizeMap = {
  xs: css.XS,
  sm: css.SM,
  md: css.MD,
  lg: css.LG,
  xl: css.XL,
}

export type ButtonSizeTypes = keyof typeof ButtonSizeMap

export type ButtonProps = TextProps & Omit<AntdButtonProps, 'size'> & {
  size?: ButtonSizeTypes
  disable?: boolean
}

export default function Button(props: ButtonProps): JSX.Element {
  const { disable, text, icon, ricon, prefix, suffix, size = 'md', className, children, ...otherProps } = props
  const _className = cn(css.Button, css[size], {
    [css.IconButton]: icon,
    [css.DisabledButton]: disable,
    [ButtonSizeMap[size]]: ButtonSizeMap[size],
  }, className)

  return (
    <AntdButton className={_className} {...otherProps}>
      <Text.Text text={text} icon={icon} ricon={ricon} prefix={prefix} suffix={suffix} size={size} />

      {children}
    </AntdButton>
  )
}
