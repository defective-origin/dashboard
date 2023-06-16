// ---| components |---
import { ComponentUIProps, useComponentUIProps } from 'components/Component'

// ---| self |---
import useFlexItemUIProps, { FlexItemUIProps } from './FlexItemUI'

export type FlexItemProps = FlexItemUIProps & ComponentUIProps

export default function FlexItem(props: FlexItemProps): JSX.Element | null {
  const _props = useFlexItemUIProps(props)

  return useComponentUIProps(_props)
}
