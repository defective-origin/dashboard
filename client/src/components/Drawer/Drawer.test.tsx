// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Drawer from './Drawer.component'
// import useDrawer from './Drawer.hook'
// import DrawerProvider, Drawer from './Drawer.context'

describe('[Drawer] component', () => {
  it('should render component', () => {
    const container = render(<Drawer />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Drawer] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useDrawer())
// 
//     expect(result.current).toBe(null)
//   })
// })

// describe('[Drawer] context', () => {
//   const wrapper = (props: DrawerProps) => <DrawerProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useDrawer(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
