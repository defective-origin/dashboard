// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Button from './Button.component'

describe('[Button] component', () => {
  it('should render component', () => {
    const container = render(<Button />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
