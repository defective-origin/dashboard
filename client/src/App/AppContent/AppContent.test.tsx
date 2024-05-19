// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppContent from './AppContent.component'
// import useAppContent from './AppContent.hook'
// import AppContentProvider, AppContent from './AppContent.context'

describe('[AppContent] component', () => {
  it('should render component', () => {
    const container = render(<AppContent />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[AppContent] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAppContent())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[AppContent] context', () => {
//   const wrapper = (props: AppContentProps) => <AppContentProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useAppContent(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
