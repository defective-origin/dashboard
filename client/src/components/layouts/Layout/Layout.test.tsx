// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Layout from './Layout.component'

describe('[Layout] component', () => {
  it('should render component', () => {
    const container = render(<Layout />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
