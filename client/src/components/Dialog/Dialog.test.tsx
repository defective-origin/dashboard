// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Dialog from './Dialog.component'
// import useDialog from './Dialog.hook'
// import DialogProvider, Dialog from './Dialog.context'

describe('[Dialog] component', () => {
  it('should render component', () => {
    const container = render(<Dialog />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[Dialog] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useDialog())
// 
//     expect(result.current).toBe(null)
//   })
// })

// describe('[Dialog] context', () => {
//   const wrapper = (props: DialogProps) => <DialogProvider { ...props } />
// 
//   it('should return options', () => {
//     const { result } = renderHook(() => useDialog(), { wrapper })
// 
//     expect(result.current).toBeTruthy()
//   })
// })
