// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Table from './Table.component'
// import useTable from './Table.hook'
// import TableProvider, Table from './Table.context'

describe('[Table] component', () => {
  it('should render component', () => {
    const container = render(<Table />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Table] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTable())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Table] context', () => {
//   const wrapper = (props: TableProps) => <TableProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTable(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
