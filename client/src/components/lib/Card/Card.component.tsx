import React from 'react'
import MuiCard, { CardProps as MuiCardProps } from '@mui/material/Card'
import MuiCardActionArea from '@mui/material/CardActionArea'
import MuiCardActions from '@mui/material/CardActions'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardHeader from '@mui/material/CardHeader'
import MuiCardMedia from '@mui/material/CardMedia'

// ---| components |---
import { Divider } from 'components/lib/Divider'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Card.module.scss'

export type CardProps = MuiCardProps & {
  className?: string
  children?: React.ReactNode
  horizontal?: boolean
  divided?: boolean
}

/**
 * Component description.
 *
 * How to use
 * @example
 * <Card />
 */
export function Card(props: CardProps): JSX.Element {
  const { divided, horizontal, children, className, ...otherProps } = props
  const _className = cn(
    css.Card,
    horizontal && css.Horizontal,
    divided && css.Divided,
    className,
  )

  return <MuiCard className={_className} {...otherProps}>{children}</MuiCard>
}

Card.displayName = 'Card'

Card.ActionArea = MuiCardActionArea
Card.Actions = MuiCardActions
Card.Content = MuiCardContent
Card.Header = MuiCardHeader
Card.Media = MuiCardMedia
Card.Divider = Divider

export default Card
