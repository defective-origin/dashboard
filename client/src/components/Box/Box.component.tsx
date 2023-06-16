// ---| components |---
import { ComponentUIProps, useComponentUIProps } from 'components/Component'

// ---| self |---
import useBoxUIProps, { BoxUIProps } from './BoxUI'

export type BoxProps = BoxUIProps & ComponentUIProps

export default function Box(props: BoxProps): JSX.Element | null {
  const _props = useBoxUIProps(props)

  return useComponentUIProps(_props)
}
