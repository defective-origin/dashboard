// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Link from './Link.component'

describe('[Link] component', () => {
  it('should render component', () => {
    const container = render(<Link />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
