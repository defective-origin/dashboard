// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Spec from './Spec.component'
// import useSpec from './Spec.hook'
// import SpecProvider, Spec from './Spec.context'

describe('[Spec] component', () => {
  it('should render component', () => {
    const container = render(<Spec />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Spec] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useSpec())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Spec] context', () => {
//   const wrapper = (props: SpecProps) => <SpecProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useSpec(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
