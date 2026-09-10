import SelectField from './SelectField.component'

describe('[SelectField] component', () => {
  it('should render component', () => {
    const container = render(<SelectField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
