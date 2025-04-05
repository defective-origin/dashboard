// ---| tests |---
import { render } from 'tests'

// ---| self |---
import WidgetViewsPage from './WidgetViewsPage.component'
// import useWidgetViewsPage from './WidgetViewsPage.hook'
// import WidgetViewsPageProvider, WidgetViewsPage from './WidgetViewsPage.context'

describe('[WidgetViewsPage] component', () => {
  it('should render component', () => {
    const container = render(<WidgetViewsPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[WidgetViewsPage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetViewsPage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[WidgetViewsPage] context', () => {
//   const wrapper = (props: WidgetViewsPageProps) => <WidgetViewsPageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetViewsPage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
