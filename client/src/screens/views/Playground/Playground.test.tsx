import Playground from './Playground.component'

describe('[Playground] component', () => {
  it('should render component', () => {
    const container = render(<Playground />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
