import React from 'react'

// ---| components |---
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

export type ButtonProps = TextProps & {
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
    <div className={_className} {...otherProps}>
      <Text.Text text={text} icon={icon} ricon={ricon} prefix={prefix} suffix={suffix} size={size} />

      {children}
    </div>
  )
}
