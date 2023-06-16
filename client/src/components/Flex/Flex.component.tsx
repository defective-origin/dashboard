// ---| components |---
import { ComponentUIProps, useComponentUIProps } from 'components/Component'

// ---| self |---
import FlexItem from './FlexItem'
import useFlexUIProps, { FlexUIProps } from './FlexUI'

export type FlexProps = FlexUIProps & ComponentUIProps

export default function Flex(props: FlexProps): JSX.Element | null {
  const _props = useFlexUIProps(props)

  return useComponentUIProps(_props)
}

Flex.Item = FlexItem
