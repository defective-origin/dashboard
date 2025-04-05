// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TableHead from './TableHead.component'
// import useTableHead from './TableHead.hook'
// import TableHeadProvider, TableHead from './TableHead.context'

describe('[TableHead] component', () => {
  it('should render component', () => {
    const container = render(<TableHead />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[TableHead] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableHead())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[TableHead] context', () => {
//   const wrapper = (props: TableHeadProps) => <TableHeadProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableHead(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
