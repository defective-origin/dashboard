// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppMenu from './AppMenu.component'

describe('[AppMenu] component', () => {
  it('should render component', () => {
    const container = render(<AppMenu />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
