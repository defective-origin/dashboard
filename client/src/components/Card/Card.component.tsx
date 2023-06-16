// ---| components |---
import { ComponentUIProps, useComponentUIProps } from 'components/Component'
import { FlexProps, useFlexUIProps } from 'components/Flex'
import Divider from 'components/Divider'
import Button from 'components/Button'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Card.module.scss'
import CardHeader from './CardHeader'
import CardFooter from './CardFooter'
import CardContent from './CardContent'
import CardMedia from './CardMedia'

export type CardProps = FlexProps & ComponentUIProps & {
  divided?: boolean
}

/**
 * Card.
 * @example
 * <Card shadow='xs' direction='y' divided {...otherProps}>
 *   <Card.Header text="Title" onClose={onClose} />
 * 
 *   <Card.Content padding="xs">Content</Card.Content>
 * 
 *   <Card.Media src="https://content.fortune.com/wp-content/uploads/2014/06/105461347.jpg">
 *     EXTRA CONTENT
 *   </Card.Media>
 * 
 *   <Card.Actions padding="xs" cgap="xs">
 *     Actions
 *     <Card.Button>Button</Card.Button>
 *     <Card.Button>Button</Card.Button>
 *   </Card.Actions>
 * 
 *   LINE
 * 
 *   <Card.Divider />
 * 
 *   <Card.Actions padding="xs" cgap="xs">
 *     Actions
 *     <Card.Button>Button</Card.Button>
 *     <Card.Button>Button</Card.Button>
 *   </Card.Actions>
 * 
 *   {children}
 * </Card>
 */
export default function Card(props: CardProps): JSX.Element | null {
  const { divided, ..._props } = useFlexUIProps(props)

  _props.className = cn(css.Card, {
    [css.Divided]: divided,
  }, _props.className)

  return useComponentUIProps(_props)
}

Card.Media = CardMedia
Card.Header = CardHeader
Card.Content = CardContent
Card.Footer = CardFooter
Card.Divider = Divider
Card.Button = Button
