import ConfirmModal from './ConfirmModal.component'


describe('[ConfirmModal] component', () => {
  it('should render component', () => {
    const container = render(<ConfirmModal />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
