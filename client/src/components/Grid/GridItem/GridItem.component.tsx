// ---| components |---
import { ComponentUIProps, useComponentUIProps } from 'components/Component'

// ---| self |---
import useGridItemUIProps, { GridItemUIProps } from './GridItemUI'

export type GridItemProps = GridItemUIProps & ComponentUIProps

export default function GridItem(props: GridItemProps): JSX.Element | null {
  const _props = useGridItemUIProps(props)

  return useComponentUIProps(_props)
}
