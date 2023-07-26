// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppGuard from './AppGuard.component'

describe('[AppGuard] component', () => {
  it('should render component', () => {
    const container = render(<AppGuard />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
