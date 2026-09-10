import ConfirmModal from './ConfirmModal.component'
// import useConfirmModal from './ConfirmModal.hooks'
// import ConfirmModalProvider, ConfirmModal from './ConfirmModal.context'

describe('[ConfirmModal] component', () => {
  it('should render component', () => {
    const container = render(<ConfirmModal />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})

// describe('[ConfirmModal] hook', () => {
//   it('should return options', () => {
//     const { result } = renderHook(() => useConfirmModal())
//
//     expect(result.current).toEqual(null)
//   })
// })

// describe('[ConfirmModal] context', () => {
//   const wrapper = (props: ConfirmModalProps) => <ConfirmModalProvider { ...props } />
//
//   it('should return options', () => {
//     const { result } = renderHook(() => useConfirmModal(), { wrapper })
//
//     expect(result.current).toBeTruthy()
//   })
// })
