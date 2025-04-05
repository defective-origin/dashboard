// ---| tests |---
import { render } from 'tests'

// ---| self |---
import SwitchField from './SwitchField.component'

describe('[SwitchField] component', () => {
  it('should render component', () => {
    const container = render(<SwitchField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
