import Text from './Text.component'

describe('[Text] component', () => {
  it('should render component', () => {
    const container = render(<Text />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
