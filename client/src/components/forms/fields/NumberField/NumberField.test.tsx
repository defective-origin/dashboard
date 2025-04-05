// ---| tests |---
import { render } from 'tests'

// ---| self |---
import NumberField from './NumberField.component'

describe('[NumberField] component', () => {
  it('should render component', () => {
    const container = render(<NumberField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
