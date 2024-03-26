// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Messages from './Messages.component'
// import useMessages from './Messages.hook'
// import MessagesProvider, Messages from './Messages.context'

describe('[Messages] component', () => {
  it('should render component', () => {
    const container = render(<Messages />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Messages] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useMessages())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Messages] context', () => {
//   const wrapper = (props: MessagesProps) => <MessagesProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useMessages(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
