// ---| tests |---
import { render } from 'tests'

// ---| self |---
import UILayoutMenu from './UILayoutMenu.component'

describe('[UILayoutMenu] component', () => {
  it('should render component', () => {
    const container = render(<UILayoutMenu />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
