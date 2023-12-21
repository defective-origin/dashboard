// ---| tests |---
import { render } from 'tests'

// ---| self |---
import FormGroup from './FormGroup.component'
// import useFormGroup from './FormGroup.hook'
// import FormGroupProvider, FormGroup from './FormGroup.context'

describe('[FormGroup] component', () => {
  it('should render component', () => {
    const container = render(<FormGroup />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[FormGroup] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useFormGroup())
// 
//     expect(result.current).toBe(null)
//   })
// })

// describe('[FormGroup] context', () => {
//   const wrapper = (props: FormGroupProps) => <FormGroupProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useFormGroup(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
