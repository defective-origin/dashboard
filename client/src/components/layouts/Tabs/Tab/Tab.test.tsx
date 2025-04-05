// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Tab from './Tab.component'
// import useTab from './Tab.hook'
// import TabProvider, Tab from './Tab.context'

describe('[Tab] component', () => {
  it('should render component', () => {
    const container = render(<Tab />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Tab] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useTab())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Tab] context', () => {
//   const wrapper = (props: TabProps) => <TabProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useTab(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
