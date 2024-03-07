// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Meta from './Meta.component'

describe('[Meta] component', () => {
  it('should render component', () => {
    const container = render(<Meta />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
