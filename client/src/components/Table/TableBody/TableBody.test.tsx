// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TableBody from './TableBody.component'
// import useTableBody from './TableBody.hook'
// import TableBodyProvider, TableBody from './TableBody.context'

describe('[TableBody] component', () => {
  it('should render component', () => {
    const container = render(<TableBody />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[TableBody] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableBody())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[TableBody] context', () => {
//   const wrapper = (props: TableBodyProps) => <TableBodyProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableBody(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
