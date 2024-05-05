// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppActions from './AppActions.component'
// import useAppActions from './AppActions.hook'
// import AppActionsProvider, AppActions from './AppActions.context'

describe('[AppActions] component', () => {
  it('should render component', () => {
    const container = render(<AppActions />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[AppActions] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAppActions())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[AppActions] context', () => {
//   const wrapper = (props: AppActionsProps) => <AppActionsProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useAppActions(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
