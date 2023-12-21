// ---| tests |---
import { render } from 'tests'

// ---| self |---
import FormButton from './FormButton.component'
// import useFormButton from './FormButton.hook'
// import FormButtonProvider, FormButton from './FormButton.context'

describe('[FormButton] component', () => {
  it('should render component', () => {
    const container = render(<FormButton />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[FormButton] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useFormButton())
// 
//     expect(result.current).toBe(null)
//   })
// })

// describe('[FormButton] context', () => {
//   const wrapper = (props: FormButtonProps) => <FormButtonProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useFormButton(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
