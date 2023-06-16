// ---| components |---
import { FlexUIProps, useFlexUIProps } from 'components/Flex'
import { ComponentUIProps, useComponentUIProps } from 'components/Component'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './CardActions.module.scss'

export type CardFooterProps = FlexUIProps & ComponentUIProps

export const CARD_ACTIONS_INIT_CONFIG: CardFooterProps = {
  padding: 'xs',
  gap: 'xs',
  direction: 'x',
  jcontent: 'end',
  aitems: 'center',
}

export default function CardFooter(props: CardFooterProps): JSX.Element | null {
  const _props = useFlexUIProps(props, CARD_ACTIONS_INIT_CONFIG)

  _props.className = cn(css.CardActions, _props.className)

  return useComponentUIProps(_props)
}
