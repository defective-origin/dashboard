import SliderField from './SliderField.component'

describe('[SliderField] component', () => {
  it('should render component', () => {
    const container = render(<SliderField path='field' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
