import SearchField from './SearchField.component'

describe('[SearchField] component', () => {
  it('should render component', () => {
    const container = render(<SearchField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
