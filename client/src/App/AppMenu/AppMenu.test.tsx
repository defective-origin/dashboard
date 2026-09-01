// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import AppMenu from './AppMenu.component'

describe('[AppMenu] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<AppMenu />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
