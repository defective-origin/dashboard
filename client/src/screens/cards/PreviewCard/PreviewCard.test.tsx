// ---| tests |---
import { render } from 'tests'

// ---| self |---
import PreviewCard from './PreviewCard.component'
// import usePreviewCard from './PreviewCard.hook'
// import PreviewCardProvider, PreviewCard from './PreviewCard.context'

describe('[PreviewCard] component', () => {
  it('should render component', () => {
    const container = render(<PreviewCard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[PreviewCard] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => usePreviewCard())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[PreviewCard] context', () => {
//   const wrapper = (props: PreviewCardProps) => <PreviewCardProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => usePreviewCard(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
