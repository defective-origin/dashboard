import CheckboxField from './CheckboxField.component'

describe('[CheckboxField] component', () => {
  it('should render component', () => {
    const container = render(<CheckboxField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
