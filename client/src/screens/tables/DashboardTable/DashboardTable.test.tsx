// ---| tests |---
import { render } from 'tests'

// ---| self |---
import DashboardTable from './DashboardTable.component'
// import useDashboardTable from './DashboardTable.hook'
// import DashboardTableProvider, DashboardTable from './DashboardTable.context'

describe('[DashboardTable] component', () => {
  it('should render component', () => {
    const container = render(<DashboardTable />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[DashboardTable] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useDashboardTable())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[DashboardTable] context', () => {
//   const wrapper = (props: DashboardTableProps) => <DashboardTableProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useDashboardTable(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
