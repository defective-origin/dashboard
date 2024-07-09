// ---| tests |---
import { render } from 'tests'

// ---| self |---
import FeatureModalForm from './FeatureModalForm.component'
// import useFeatureModalForm from './FeatureModalForm.hook'
// import FeatureModalFormProvider, FeatureModalForm from './FeatureModalForm.context'

describe('[FeatureModalForm] component', () => {
  it('should render component', () => {
    const container = render(<FeatureModalForm />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[FeatureModalForm] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useFeatureModalForm())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[FeatureModalForm] context', () => {
//   const wrapper = (props: FeatureModalFormProps) => <FeatureModalFormProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useFeatureModalForm(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
