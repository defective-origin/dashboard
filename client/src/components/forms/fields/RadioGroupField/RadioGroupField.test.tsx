// ---| tests |---
import { render } from 'tests'

// ---| self |---
import RadioGroupField from './RadioGroupField.component'
// import useRadioGroupField from './RadioGroupField.hook'
// import RadioGroupFieldProvider, RadioGroupField from './RadioGroupField.context'

describe('[RadioGroupField] component', () => {
  it('should render component', () => {
    const container = render(<RadioGroupField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[RadioGroupField] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useRadioGroupField())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[RadioGroupField] context', () => {
//   const wrapper = (props: RadioGroupFieldProps) => <RadioGroupFieldProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useRadioGroupField(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
