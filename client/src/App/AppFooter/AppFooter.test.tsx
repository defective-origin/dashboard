// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppFooter from './AppFooter.component'

describe('[AppFooter] component', () => {
  it('should render component', () => {
    const container = render(<AppFooter />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
