// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Action from './Action.component'
// import useAction from './Action.hook'
// import ActionProvider, Action from './Action.context'

describe('[Action] component', () => {
  it('should render component', () => {
    const container = render(<Action />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Action] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAction())
// 
//     expect(result.current).toBe(null)
//   })
// })

// describe('[Action] context', () => {
//   const wrapper = (props: ActionProps) => <ActionProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useAction(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
