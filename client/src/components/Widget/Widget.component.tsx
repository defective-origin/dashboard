// ---| components |---
import { GeneralProps } from 'components/Component'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Widget.module.scss'

export type WidgetProps = GeneralProps & {
  uuid: string
}

// TODO: lazy loading
// TODO: take widget from map
export default function Widget(props: WidgetProps): JSX.Element {
  const { uuid, className, children, ...otherProps } = props

  return (
    <div className={cn(css.Widget, className)} {...otherProps}>
      <div>loading...</div>
    </div>
  )
}
