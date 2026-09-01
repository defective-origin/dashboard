// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import Logo from './Logo.component'

describe('[Logo] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<Logo />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
