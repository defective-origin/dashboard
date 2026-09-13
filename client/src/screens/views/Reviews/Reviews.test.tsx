import Reviews from './Reviews.component'

describe('[Reviews] component', () => {
  it('should render component', () => {
    const container = render(<Reviews />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
