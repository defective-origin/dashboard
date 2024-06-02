import React, { forwardRef } from 'react'
import MuiCard from '@mui/material/Card'
import MuiCardActionArea from '@mui/material/CardActionArea'
import MuiCardActions from '@mui/material/CardActions'
import MuiCardContent from '@mui/material/CardContent'
import MuiCardHeader from '@mui/material/CardHeader'
import MuiCardMedia from '@mui/material/CardMedia'

// ---| core |---
import { cn } from 'tools'

// ---| components |---
import Divider from 'components/Divider'

// ---| self |---
import css from './Card.module.scss'

export type CardProps = {
  horizontal?: boolean
  divided?: boolean
  style?: React.CSSProperties
  className?: string
  children?: React.ReactNode
}

// TODO: remove forwardRef after migrating to react 19

/**
 * Component description.
 *
 * How to use
 * @example
 * <Card />
 */
export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref): JSX.Element | null => {
  const { divided, horizontal, children, className, ...otherProps } = props
  const _className = cn(css.Card, {
    [css.horizontal]: horizontal,
    [css.divided]: divided,
  }, className)

  return (
    <MuiCard ref={ref} className={_className} {...otherProps}>
      {children}
    </MuiCard>
  )
}) as unknown as React.FC<CardProps> & Record<'ActionArea' | 'Actions' | 'Content' | 'Header' | 'Media' | 'Divider', React.FC<any>>

Card.displayName = 'Card'

Card.ActionArea = MuiCardActionArea
Card.Actions = MuiCardActions
Card.Content = MuiCardContent
Card.Header = MuiCardHeader
Card.Media = MuiCardMedia
Card.Divider = Divider

export default Card
