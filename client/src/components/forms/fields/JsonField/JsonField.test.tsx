import JsonField from './JsonField.component'


describe('[JsonField] component', () => {
  it('should render component', () => {
    const container = render(<JsonField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
