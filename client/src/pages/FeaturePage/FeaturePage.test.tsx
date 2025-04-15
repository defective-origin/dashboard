// ---| tests |---
import { render } from 'tests'

// ---| self |---
import FeaturePage from './FeaturePage.component'
// import useFeaturePage from './FeaturePage.hooks'
// import FeaturePageProvider, FeaturePage from './FeaturePage.context'

describe('[FeaturePage] component', () => {
  it('should render component', () => {
    const container = render(<FeaturePage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[FeaturePage] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useFeaturePage())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[FeaturePage] context', () => {
//   const wrapper = (props: FeaturePageProps) => <FeaturePageProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useFeaturePage(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
