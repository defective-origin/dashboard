import RadioField from './RadioField.component'

describe('[RadioField] component', () => {
  it('should render component', () => {
    const container = render(<RadioField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
