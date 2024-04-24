// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Aside from './Aside.component'
// import useAside from './Aside.hook'
// import AsideProvider, Aside from './Aside.context'

describe('[Aside] component', () => {
  it('should render component', () => {
    const container = render(<Aside />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Aside] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useAside())
// 
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Aside] context', () => {
//   const wrapper = (props: AsideProps) => <AsideProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useAside(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
