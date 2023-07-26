// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppMenuItem from './AppMenuItem.component'

describe('[AppMenuItem] component', () => {
  it('should render component', () => {
    const container = render(<AppMenuItem icon='close' content='TEST' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
