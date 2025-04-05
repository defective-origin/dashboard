// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Specs from './Specs.component'
// import useSpecs from './Specs.hook'
// import SpecsProvider, Specs from './Specs.context'

describe('[Specs] component', () => {
  it('should render component', () => {
    const container = render(<Specs />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Specs] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useSpecs())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Specs] context', () => {
//   const wrapper = (props: SpecsProps) => <SpecsProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useSpecs(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
