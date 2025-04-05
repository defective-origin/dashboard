// ---| tests |---
import { render } from 'tests'

// ---| self |---
import WidgetViewPage from './WidgetViewPage.component'
// import useWidgetViewPage from './WidgetViewPage.hook'
// import WidgetViewPageProvider, WidgetViewPage from './WidgetViewPage.context'

describe('[WidgetViewPage] component', () => {
  it('should render component', () => {
    const container = render(<WidgetViewPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[WidgetViewPage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetViewPage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[WidgetViewPage] context', () => {
//   const wrapper = (props: WidgetViewPageProps) => <WidgetViewPageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetViewPage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
