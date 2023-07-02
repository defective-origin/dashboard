// ---| components |---
import { GeneralUIProps, ReturnUIProps } from 'components/Component'
import { BoxUIConf, BoxUIProps, useBoxUIProps } from 'components/Box'

// ---| common |---
import { cn, _ } from 'common/tools'

// ---| self |--
import {
  GridItemJustifyTypes,
  GridItemAlignTypes,
  GridItemAlignMap,
  GridItemJustifyMap,
} from './GridItemUI.constant'

export type GridItemUIConf = BoxUIConf & {
  column?: React.CSSProperties['gridColumn']
  cstart?: React.CSSProperties['gridColumnStart']
  cend?: React.CSSProperties['gridColumnEnd']

  row?: React.CSSProperties['gridRow']
  rstart?: React.CSSProperties['gridRowStart']
  rend?: React.CSSProperties['gridRowEnd']

  area?: React.CSSProperties['gridArea']

  place?: React.CSSProperties['placeSelf']
  justify?: GridItemJustifyTypes
  align?: GridItemAlignTypes
}

export type GridItemUIProps = GeneralUIProps & GridItemUIConf & BoxUIProps

export default function useGridItemUIProps<T extends GridItemUIProps>(
  props: T,
  init?: T,
): ReturnUIProps<GridItemUIConf, T> {
  const {
    ui,
    column,
    cstart,
    cend,
    row,
    rstart,
    rend,
    area,
    place,
    align,
    justify,
    style,
    className,
    ...otherProps
  } = useBoxUIProps({ ...init, ...props })
  const _ui = { ...ui, column, cstart, cend, row, rstart, rend, area, place, align, justify }
  const _className = cn(
    'grid-item',
    _.get(GridItemAlignMap, align as string),
    _.get(GridItemJustifyMap, justify as string),
    className,
  )
  const _style = _.omitBy({
    gridColumn: column,
    gridColumnStart: cstart,
    gridColumnEnd: cend,
    gridRow: row,
    gridRowStart: rstart,
    gridRowEnd: rend,
    gridArea: area,
    placeSelf: place,
    ...style,
  }, _.isNil)

  return { ui: _ui, className: _className, style: _style, ...otherProps } as ReturnUIProps<GridItemUIConf, T>
}
