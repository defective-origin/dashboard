import NumberField from './NumberField.component'

describe('[NumberField] component', () => {
  it('should render component', () => {
    const container = render(<NumberField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
