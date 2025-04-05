// ---| tests |---
import { render } from 'tests'

// ---| self |---
import ButtonGroup from './ButtonGroup.component'
// import useButtonGroup from './ButtonGroup.hook'
// import ButtonGroupProvider, ButtonGroup from './ButtonGroup.context'

describe('[ButtonGroup] component', () => {
  it('should render component', () => {
    const container = render(<ButtonGroup />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[ButtonGroup] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useButtonGroup())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[ButtonGroup] context', () => {
//   const wrapper = (props: ButtonGroupProps) => <ButtonGroupProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useButtonGroup(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
