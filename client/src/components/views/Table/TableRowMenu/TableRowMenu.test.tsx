// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TableRowMenu from './TableRowMenu.component'
// import useTableRowMenu from './TableRowMenu.hooks'
// import TableRowMenuProvider, TableRowMenu from './TableRowMenu.context'

describe('[TableRowMenu] component', () => {
  it('should render component', () => {
    const container = render(<TableRowMenu />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[TableRowMenu] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableRowMenu())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[TableRowMenu] context', () => {
//   const wrapper = (props: TableRowMenuProps) => <TableRowMenuProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTableRowMenu(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
