// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Clipboard from './Clipboard.component'
// import useClipboard from './Clipboard.hooks'
// import ClipboardProvider, Clipboard from './Clipboard.context'

describe('[Clipboard] component', () => {
  it('should render component', () => {
    const container = render(<Clipboard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Clipboard] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useClipboard())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[Clipboard] context', () => {
//   const wrapper = (props: ClipboardProps) => <ClipboardProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useClipboard(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
