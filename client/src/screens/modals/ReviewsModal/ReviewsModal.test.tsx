import ReviewsModal from './ReviewsModal.component'


describe('[ReviewsModal] component', () => {
  it('should render component', () => {
    const container = render(<ReviewsModal />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
