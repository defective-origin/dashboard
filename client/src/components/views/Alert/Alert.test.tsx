import Alert from './Alert.component'

describe('[Alert] component', () => {
  it('should render component', () => {
    const container = render(<Alert />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
