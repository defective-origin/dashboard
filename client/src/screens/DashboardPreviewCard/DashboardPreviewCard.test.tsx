// ---| tests |---
import { render } from 'tests'

// ---| self |---
import DashboardPreviewCard from './DashboardPreviewCard.component'
// import useDashboardPreviewCard from './DashboardPreviewCard.hook'
// import DashboardPreviewCardProvider, DashboardPreviewCard from './DashboardPreviewCard.context'

describe('[DashboardPreviewCard] component', () => {
  it('should render component', () => {
    const container = render(<DashboardPreviewCard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[DashboardPreviewCard] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useDashboardPreviewCard())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[DashboardPreviewCard] context', () => {
//   const wrapper = (props: DashboardPreviewCardProps) => <DashboardPreviewCardProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useDashboardPreviewCard(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
