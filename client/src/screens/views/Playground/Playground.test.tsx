// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Playground from './Playground.component'
// import usePlayground from './Playground.hooks'
// import PlaygroundProvider, Playground from './Playground.context'

describe('[Playground] component', () => {
  it('should render component', () => {
    const container = render(<Playground />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Playground] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => usePlayground())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Playground] context', () => {
//   const wrapper = (props: PlaygroundProps) => <PlaygroundProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => usePlayground(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
