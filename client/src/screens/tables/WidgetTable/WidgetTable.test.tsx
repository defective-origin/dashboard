// ---| tests |---
import { render } from 'tests'

// ---| self |---
import WidgetTable from './WidgetTable.component'
// import useWidgetTable from './WidgetTable.hook'
// import WidgetTableProvider, WidgetTable from './WidgetTable.context'

describe('[WidgetTable] component', () => {
  it('should render component', () => {
    const container = render(<WidgetTable />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[WidgetTable] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetTable())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[WidgetTable] context', () => {
//   const wrapper = (props: WidgetTableProps) => <WidgetTableProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetTable(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
