import CheckboxListField from './CheckboxListField.component'


describe('[CheckboxListField] component', () => {
  it('should render component', () => {
    const container = render(<CheckboxListField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
