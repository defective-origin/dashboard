import SwitchField from './SwitchField.component'

describe('[SwitchField] component', () => {
  it('should render component', () => {
    const container = render(<SwitchField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
