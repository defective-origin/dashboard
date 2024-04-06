// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Overlay from './Overlay.component'
// import useOverlay from './Overlay.hook'
// import OverlayProvider, Overlay from './Overlay.context'

describe('[Overlay] component', () => {
  it('should render component', () => {
    const container = render(<Overlay />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Overlay] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useOverlay())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Overlay] context', () => {
//   const wrapper = (props: OverlayProps) => <OverlayProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useOverlay(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
