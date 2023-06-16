import React from 'react'

// ---| components |---
import Icon, { IconTypes } from 'components/Icon'
import { ComponentUIProps, useComponentUIProps } from 'components/Component'

// ---| self |---
import useTextUIProps, { TextUIProps } from './TextUI'

export const TextTypeMap = {
  paragraph: 'p',
  text: 'span',
  mark: 'mark',
  code: 'code',
  keyboard: 'kbd',
  underline: 'u',
  delete: 'del',
  strong: 'strong',
  italic: 'i',
  link: 'a',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
} as const

export type TextTypes = keyof typeof TextTypeMap

export type TextProps = TextUIProps & ComponentUIProps & {
  text?: React.ReactNode
  icon?: IconTypes
  ricon?: IconTypes
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export default function Text(props: TextProps): JSX.Element | null {
  const { ui, icon, ricon, prefix, suffix, text, children, ...otherProps } = useTextUIProps(props)
  const _children = [
    icon && <Icon type={icon} size={ui.size} />,
    prefix,
    text,
    children,
    suffix,
    ricon && <Icon type={ricon} size={ui.size} />,
  ]

  return useComponentUIProps<TextProps>(otherProps, { map: TextTypeMap, type: 'text', children: _children })
}

//  TODO: add Highlight component  or  prop
Text.H1 = React.memo((props: TextProps) => <Text type="h1" {...props} />)
Text.H2 = React.memo((props: TextProps) => <Text type="h2" {...props} />)
Text.H3 = React.memo((props: TextProps) => <Text type="h3" {...props} />)
Text.H4 = React.memo((props: TextProps) => <Text type="h4" {...props} />)
Text.H5 = React.memo((props: TextProps) => <Text type="h5" {...props} />)
Text.Paragraph = React.memo((props: TextProps) => <Text type="paragraph" {...props} />)
Text.Text = React.memo((props: TextProps) => <Text type="text" {...props} />)
Text.Mark = React.memo((props: TextProps) => <Text type="mark" {...props} />)
Text.Code = React.memo((props: TextProps) => <Text type="code" {...props} />)
Text.Keyboard = React.memo((props: TextProps) => <Text type="keyboard" {...props} />)
Text.Underline = React.memo((props: TextProps) => <Text type="underline" {...props} />)
Text.Delete = React.memo((props: TextProps) => <Text type="delete" {...props} />)
Text.Strong = React.memo((props: TextProps) => <Text type="strong" {...props} />)
Text.Italic = React.memo((props: TextProps) => <Text type="italic" {...props} />)
Text.Link = React.memo((props: TextProps) => <Text type="link" {...props} />)
