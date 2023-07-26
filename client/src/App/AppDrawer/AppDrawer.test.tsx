// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppDrawer from './AppDrawer.component'

describe('[AppDrawer] component', () => {
  it('should render component', () => {
    const container = render(<AppDrawer />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
