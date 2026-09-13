import Actions from './Actions.component'

describe('[Actions] component', () => {
  it('should render component', () => {
    const container = render(<Actions />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
