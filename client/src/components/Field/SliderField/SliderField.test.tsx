// ---| tests |---
import { render } from 'tests'

// ---| self |---
import SliderField from './SliderField.component'

describe('[SliderField] component', () => {
  it('should render component', () => {
    const container = render(<SliderField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
