// ---| tests |---
import { render } from 'tests'

// ---| self |---
import CheckboxField from './CheckboxField.component'

describe('[CheckboxField] component', () => {
  it('should render component', () => {
    const container = render(<CheckboxField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
