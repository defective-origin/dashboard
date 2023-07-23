// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppHeader from './AppHeader.component'

describe('[AppHeader] component', () => {
  it('should render component', () => {
    const container = render(<AppHeader />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
