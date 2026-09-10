import TextField from './TextField.component'

describe('[TextField] component', () => {
  it('should render component', () => {
    const container = render(<TextField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
