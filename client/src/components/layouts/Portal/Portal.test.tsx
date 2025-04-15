// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Portal from './Portal.component'
// import usePortal from './Portal.hooks'
// import PortalProvider, Portal from './Portal.context'

describe('[Portal] component', () => {
  it('should render component', () => {
    const container = render(<Portal name='page-name' content={<div>Content</div>} />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
