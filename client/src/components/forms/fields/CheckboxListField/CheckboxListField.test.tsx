// ---| tests |---
import { render } from 'tests'

// ---| self |---
import CheckboxListField from './CheckboxListField.component'

describe('[CheckboxListField] component', () => {
  it('should render component', () => {
    const container = render(<CheckboxListField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[CheckboxListField] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useCheckboxListField())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[CheckboxListField] context', () => {
//   const wrapper = (props: CheckboxListFieldProps) => <CheckboxListFieldProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useCheckboxListField(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
