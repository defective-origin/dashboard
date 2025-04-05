// ---| tests |---
import { render } from 'tests'

// ---| self |---
import FeatureModal from './FeatureModal.component'
// import useFeatureModal from './FeatureModal.hook'
// import FeatureModalProvider, FeatureModal from './FeatureModal.context'

describe('[FeatureModal] component', () => {
  it('should render component', () => {
    const container = render(<FeatureModal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[FeatureModal] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useFeatureModal())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[FeatureModal] context', () => {
//   const wrapper = (props: FeatureModalProps) => <FeatureModalProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useFeatureModal(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
