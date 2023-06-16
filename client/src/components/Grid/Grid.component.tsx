// ---| components |---
import { ComponentUIProps, useComponentUIProps } from 'components/Component'

// ---| self |---
import GridItem from './GridItem'
import useGridUIProps, { GridUIProps } from './GridUI'

export type GridProps = GridUIProps & ComponentUIProps

export default function Grid(props: GridProps): JSX.Element | null {
  const _props = useGridUIProps(props)

  return useComponentUIProps(_props)
}

Grid.Item = GridItem
