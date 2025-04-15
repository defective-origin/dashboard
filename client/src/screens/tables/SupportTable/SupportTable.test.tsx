// ---| tests |---
import { render } from 'tests'

// ---| self |---
import SupportTable from './SupportTable.component'
// import useSupportTable from './SupportTable.hooks'
// import SupportTableProvider, SupportTable from './SupportTable.context'

describe('[SupportTable] component', () => {
  it('should render component', () => {
    const container = render(<SupportTable />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[SupportTable] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useSupportTable())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[SupportTable] context', () => {
//   const wrapper = (props: SupportTableProps) => <SupportTableProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useSupportTable(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
