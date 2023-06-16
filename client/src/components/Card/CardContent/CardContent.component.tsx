// ---| components |---
import Box, { BoxUIProps } from 'components/Box'
import Scroll from 'components/Scroll'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './CardContent.module.scss'

export type CardContentProps = BoxUIProps

export default function CardContent(props: CardContentProps): JSX.Element | null {
  const { padding = 'xs', className, children, ...otherProps } = props
  const _className = cn(css.CardContent, className)

  return (
    <Scroll className={_className} direction="y">
      <Box padding={padding} {...otherProps}>
        {children}
      </Box>
    </Scroll>
  )
}
