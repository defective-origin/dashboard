import React from 'react'

// ---| core |---
import { cn } from 'tools'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Popup from 'components/Popup'
import Button from 'components/Button'
import Card from 'components/Card'
import Text from 'components/Text'
import Messages, { MessageItem } from 'components/Messages'
import Scroll from 'components/Scroll'


// ---| self |---
import css from './Help.module.scss'

export type HelpProps = {
  open?: boolean
  height?: number
  title?: React.ReactNode
  content?: React.ReactNode
  messages?: MessageItem[]
  className?: string
  children?: React.ReactNode
}

/**
 * Show description in popup.
 *
 * How to use
 * @example
 * <Help title='Title' content='Content' messages={['Message 1', 'Message 2']} width={500} />
 */
export function Help(props: HelpProps): JSX.Element {
  const { messages, title, open, height = 300, className, content, children = content, ...otherProps } = props
  const _className = cn(css.Help, className)

  return (
    <Popup
      className={_className}
      arrow
      open={open}
      v='top'
      trigger={(o) => <Button start='help' active={o.open} />}
      {...otherProps}
    >
      <Card style={{ maxHeight: height }}>
        <Card.Header title={title}/>
        <Card.Content>
          <Scroll v='y' size='xs' />
          <Text v='body2' size='xs'>{children}</Text>
          <Messages items={messages} size='xs'/>
        </Card.Content>
      </Card>
    </Popup>
  )
}

Help.displayName = 'Help'

export default Help
