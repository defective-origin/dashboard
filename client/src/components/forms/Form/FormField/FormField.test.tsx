import FormField from './FormField.component'


describe('[FormField] component', () => {
  it('should render component', () => {
    const container = render(<FormField as={() => <input />} path='username' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
