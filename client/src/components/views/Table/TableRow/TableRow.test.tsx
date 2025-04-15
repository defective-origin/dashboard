// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TableRow from './TableRow.component'
// import useTableRow from './TableRow.hooks'
// import TableRowProvider, TableRow from './TableRow.context'

describe('[TableRow] component', () => {
  it('should render component', () => {
    const container = render(<TableRow />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[TableRow] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableRow())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[TableRow] context', () => {
//   const wrapper = (props: TableRowProps) => <TableRowProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableRow(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
