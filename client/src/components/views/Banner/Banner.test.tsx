import Banner from './Banner.component'

describe('[Banner] component', () => {
  it('should render component', () => {
    const container = render(<Banner />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
