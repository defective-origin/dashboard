// ---| tests |---
import { render } from 'tests'

// ---| self |---
import FeatureTable from './FeatureTable.component'
// import useFeatureTable from './FeatureTable.hooks'
// import FeatureTableProvider, FeatureTable from './FeatureTable.context'

describe('[FeatureTable] component', () => {
  it('should render component', () => {
    const container = render(<FeatureTable />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[FeatureTable] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useFeatureTable())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[FeatureTable] context', () => {
//   const wrapper = (props: FeatureTableProps) => <FeatureTableProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useFeatureTable(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
