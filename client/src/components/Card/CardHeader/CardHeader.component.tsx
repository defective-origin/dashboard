import React from 'react'

// ---| components |---
import Flex, { FlexProps } from 'components/Flex'
import Text, { TextProps } from 'components/Text'
import Button from 'components/Button'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './CardHeader.module.scss'

export type CardHeaderProps = TextProps & FlexProps & {
  extra?: React.ReactNode
  onClose?: () => void
}

export default function CardHeader(props: CardHeaderProps): JSX.Element {
  const {
    as,
    size,
    icon: licon,
    ricon,
    prefix,
    suffix,
    status,
    text,
    ellipses,
    extra,
    padding = 'xs',
    onClose,
    className,
    children,
    ...otherProps
  } = props

  return (
    <Flex
      className={cn(css.CardHeader, className)}
      padding={padding}
      jcontent="space-between"
      direction="x"
      aitems="center"
      {...otherProps}
    >
      <Flex.Item grow={1}>
        <Text.H3
          className={css.Text}
          text={text}
          status={status}
          prefix={prefix}
          suffix={suffix}
          icon={licon}
          ricon={ricon}
          ellipses={ellipses}
        />
      </Flex.Item>

      {children}

      <Flex className={css.Extra} direction="x" aitems="center">
        {extra}
        {onClose && <Button icon="close" size="xs" type="text"onClick={onClose} />}
      </Flex>
    </Flex>
  )
}
