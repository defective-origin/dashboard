// ---| tests |---
import { render } from 'tests'

// ---| self |---
import SelectField from './SelectField.component'

describe('[SelectField] component', () => {
  it('should render component', () => {
    const container = render(<SelectField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
