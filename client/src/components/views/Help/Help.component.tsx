import React from 'react'

// ---| core |---
import { cn } from 'tools'
import { Size } from 'theme'

// ---| pages |---
// ---| screens |---
// ---| components |---
import Popup from 'components/popups/Popup'
import Button from 'components/actions/Button'
import Card from 'components/layouts/Card'
import Text from 'components/views/Text'
import Messages, { MessageItem } from 'components/views/Messages'
import Scroll from 'components/layouts/Scroll'


// ---| self |---
import css from './Help.module.scss'

export type HelpProps = {
  size?: Size
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
      trigger={o => <Button start='help' active={o.open} />}
      {...otherProps}
    >
      <Card className={css.Card} style={{ maxHeight: height }}>
        {title && <Card.Header className={css.Header} title={<Text content={title} size='sm' height={1} />}/>}
        <Card.Content>
          <Scroll v='y' size='xs' />
          <Text v='body2' size='xxs'>{children}</Text>
          {messages && <Messages items={messages} size='xxs'/>}
        </Card.Content>
      </Card>
    </Popup>
  )
}

Help.displayName = 'Help'

export default Help
