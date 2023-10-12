// ---| tests |---
import { render } from 'tests'

// ---| self |---
import DateTimeField from './DateTimeField.component'

describe('[DateTimeField] component', () => {
  it('should render component', () => {
    const container = render(<DateTimeField />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
