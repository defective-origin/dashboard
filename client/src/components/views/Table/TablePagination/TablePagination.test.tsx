// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TablePagination from './TablePagination.component'
// import useTablePagination from './TablePagination.hook'
// import TablePaginationProvider, TablePagination from './TablePagination.context'

describe('[TablePagination] component', () => {
  it('should render component', () => {
    const container = render(<TablePagination />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[TablePagination] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTablePagination())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[TablePagination] context', () => {
//   const wrapper = (props: TablePaginationProps) => <TablePaginationProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTablePagination(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
