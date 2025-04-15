// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TableCell from './TableCell.component'
// import useTableCell from './TableCell.hooks'
// import TableCellProvider, TableCell from './TableCell.context'

describe('[TableCell] component', () => {
  it('should render component', () => {
    const container = render(<TableCell />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[TableCell] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableCell())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[TableCell] context', () => {
//   const wrapper = (props: TableCellProps) => <TableCellProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableCell(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
