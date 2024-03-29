import React from 'react'
import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card'
import MuiCardActionArea from '@mui/material/CardActionArea'
import MuiCardActions from '@mui/material/CardActions'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardHeader from '@mui/material/CardHeader'
import MuiCardMedia from '@mui/material/CardMedia'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Divider from 'components/Divider'
import Button, { ButtonProps } from 'components/Button'

// ---| self |---
import css from './Card.module.scss'

export type CardProps = Omit<MuiCardProps, 'title' | 'content'> & {
  className?: string
  children?: React.ReactNode
  horizontal?: boolean
  divided?: boolean
  content?: React.ReactNode
  title?: React.ReactNode | null
  actions?: ButtonProps | ButtonProps[]
  onClose?: () => void
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Card />
 */
export function Card(props: CardProps): JSX.Element | null {
  const { actions = [], title, content, divided, horizontal, onClose, children, className, ...otherProps } = props
  const buttons = Array.isArray(actions) ? actions : [actions]
  const _className = cn(
    css.Card, {
      [css.horizontal]: horizontal,
      [css.divided]: divided,
    },
    className,
  )

  if (!title && !content && !buttons.length && !children) {
    return null
  }

  return (
    <MuiCard
      className={_className}
      {...otherProps}
    >
      {(title || onClose) && (
        <Card.Header
          title={title}
          action={onClose && <Button start='close' onClick={onClose} />}
        />
      )}

      {content && <Card.Content>{content}</Card.Content>}

      {!!buttons.length && (
        <Card.Actions>
          {buttons.map((action) => <Card.Button {...action} />)}
        </Card.Actions>
      )}

      {children}
    </MuiCard>
  )
}

Card.displayName = 'Card'

Card.ActionArea = MuiCardActionArea
Card.Actions = MuiCardActions
Card.Content = MuiCardContent
Card.Header = MuiCardHeader
Card.Media = MuiCardMedia
Card.Divider = Divider
Card.Button = Button

export default Card
