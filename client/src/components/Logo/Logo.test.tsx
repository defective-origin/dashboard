// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Logo from './Logo.component'

describe('[Logo] component', () => {
  it('should render component', () => {
    const container = render(<Logo />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
