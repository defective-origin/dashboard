// ---| tests |---
import { render } from 'tests'

// ---| self |---
import TabContent from './TabContent.component'
// import useTabContent from './TabContent.hooks'
// import TabContentProvider, TabContent from './TabContent.context'

describe('[TabContent] component', () => {
  it('should render component', () => {
    const container = render(<TabContent />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[TabContent] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTabContent())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[TabContent] context', () => {
//   const wrapper = (props: TabContentProps) => <TabContentProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTabContent(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
