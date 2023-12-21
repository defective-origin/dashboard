// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Head from './Head.component'
// import useHead from './Head.hook'
// import HeadProvider, Head from './Head.context'

describe('[Head] component', () => {
  it('should render component', () => {
    const container = render(<Head />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Head] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useHead())
// 
//     expect(result.current).toBe(null)
//   })
// })

// describe('[Head] context', () => {
//   const wrapper = (props: HeadProps) => <HeadProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useHead(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
