// ---| components |---
import { ComponentUIProps, useComponentUIProps } from 'components/Component'
import { BoxUIProps, useBoxUIProps } from 'components/Box'

// ---| common |---
import { cn } from 'common/tools'

// ---| self |---
import css from './Paper.module.scss'

export type PaperProps = BoxUIProps & ComponentUIProps

export const PAPER_INIT_CONFIG: PaperProps = {
  shape: 'round',
}

export default function Paper(props: PaperProps): JSX.Element | null {
  const _props = useBoxUIProps(props, PAPER_INIT_CONFIG)

  _props.className = cn(css.Paper, _props.className)

  return useComponentUIProps(_props)
}
