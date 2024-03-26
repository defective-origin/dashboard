// ---| tests |---
import { render } from 'tests'

// ---| self |---
import BaseField from './BaseField.component'
// import useBaseField from './BaseField.hook'
// import BaseFieldProvider, BaseField from './BaseField.context'

describe('[BaseField] component', () => {
  it('should render component', () => {
    const container = render(<BaseField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[BaseField] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useBaseField())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[BaseField] context', () => {
//   const wrapper = (props: BaseFieldProps) => <BaseFieldProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useBaseField(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
