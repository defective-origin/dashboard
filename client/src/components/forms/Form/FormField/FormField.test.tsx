// ---| tests |---
import { render } from 'tests'

// ---| self |---
import FormField from './FormField.component'
// import useFormField from './FormField.hooks'
// import FormFieldProvider, FormField from './FormField.context'

describe('[FormField] component', () => {
  it('should render component', () => {
    const container = render(<FormField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[FormField] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useFormField())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[FormField] context', () => {
//   const wrapper = (props: FormFieldProps) => <FormFieldProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useFormField(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
