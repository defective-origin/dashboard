// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Portal from './Portal.component'
// import usePortal from './Portal.hook'
// import PortalProvider, Portal from './Portal.context'

describe('[Portal] component', () => {
  it('should render component', () => {
    const container = render(<Portal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Portal] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => usePortal())
// 
//     expect(result.current).toBe(null)
//   })
// })

// describe('[Portal] context', () => {
//   const wrapper = (props: PortalProps) => <PortalProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => usePortal(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
