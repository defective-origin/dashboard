// ---| tests |---
import { render } from 'tests'

// ---| self |---
import WidgetsPage from './WidgetsPage.component'
// import useWidgetsPage from './WidgetsPage.hooks'
// import WidgetsPageProvider, WidgetsPage from './WidgetsPage.context'

describe('[WidgetsPage] component', () => {
  it('should render component', () => {
    const container = render(<WidgetsPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[WidgetsPage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetsPage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[WidgetsPage] context', () => {
//   const wrapper = (props: WidgetsPageProps) => <WidgetsPageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetsPage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
