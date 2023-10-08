// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Section from './Section.component'

describe('[Section] component', () => {
  it('should render component', () => {
    const container = render(<Section />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
