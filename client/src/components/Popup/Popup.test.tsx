// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Popup from './Popup.component'
// import usePopup from './Popup.hook'
// import PopupProvider, Popup from './Popup.context'

describe('[Popup] component', () => {
  it('should render component', () => {
    const container = render(<Popup />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Popup] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => usePopup())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Popup] context', () => {
//   const wrapper = (props: PopupProps) => <PopupProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => usePopup(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
