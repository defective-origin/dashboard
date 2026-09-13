import RadioGroupField from './RadioGroupField.component'


describe('[RadioGroupField] component', () => {
  it('should render component', () => {
    const container = render(<RadioGroupField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
