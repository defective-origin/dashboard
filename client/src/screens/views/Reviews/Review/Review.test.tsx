import Review from './Review.component'


describe('[Review] component', () => {
  it('should render component', () => {
    const container = render(<Review rate={0} content='content' />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
