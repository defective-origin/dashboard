// ---| self |---
import useComponentUIProps, { ComponentUIProps } from './ComponentUI'

export type ComponentProps = ComponentUIProps

export default function Component(props: ComponentProps): JSX.Element | null {
  return useComponentUIProps(props)
}
