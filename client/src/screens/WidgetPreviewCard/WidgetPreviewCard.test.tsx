// ---| tests |---
import { render } from 'tests'

// ---| self |---
import WidgetPreviewCard from './WidgetPreviewCard.component'
// import useWidgetPreviewCard from './WidgetPreviewCard.hook'
// import WidgetPreviewCardProvider, WidgetPreviewCard from './WidgetPreviewCard.context'

describe('[WidgetPreviewCard] component', () => {
  it('should render component', () => {
    const container = render(<WidgetPreviewCard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[WidgetPreviewCard] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetPreviewCard())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[WidgetPreviewCard] context', () => {
//   const wrapper = (props: WidgetPreviewCardProps) => <WidgetPreviewCardProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useWidgetPreviewCard(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
