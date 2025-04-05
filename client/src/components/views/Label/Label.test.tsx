// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Label from './Label.component'
// import useLabel from './Label.hook'
// import LabelProvider, Label from './Label.context'

describe('[Label] component', () => {
  it('should render component', () => {
    const container = render(<Label />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Label] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useLabel())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Label] context', () => {
//   const wrapper = (props: LabelProps) => <LabelProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useLabel(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
