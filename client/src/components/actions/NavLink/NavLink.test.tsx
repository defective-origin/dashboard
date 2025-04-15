// ---| tests |---
import { render } from 'tests'

// ---| self |---
import NavLink from './NavLink.component'
// import useNavLink from './NavLink.hooks'
// import NavLinkProvider, NavLink from './NavLink.context'

describe('[NavLink] component', () => {
  it('should render component', () => {
    const container = render(<NavLink />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
