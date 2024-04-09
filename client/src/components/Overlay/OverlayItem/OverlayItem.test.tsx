// ---| tests |---
import { render } from 'tests'

// ---| self |---
import OverlayItem from './OverlayItem.component'
// import useOverlayItem from './OverlayItem.hook'
// import OverlayItemProvider, OverlayItem from './OverlayItem.context'

describe('[OverlayItem] component', () => {
  it('should render component', () => {
    const container = render(<OverlayItem />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[OverlayItem] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useOverlayItem())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[OverlayItem] context', () => {
//   const wrapper = (props: OverlayItemProps) => <OverlayItemProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useOverlayItem(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
