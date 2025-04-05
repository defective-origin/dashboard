// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Tabs from './Tabs.component'
// import useTabs from './Tabs.hook'
// import TabsProvider, Tabs from './Tabs.context'

describe('[Tabs] component', () => {
  it('should render component', () => {
    const container = render(<Tabs />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Tabs] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTabs())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Tabs] context', () => {
//   const wrapper = (props: TabsProps) => <TabsProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTabs(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
