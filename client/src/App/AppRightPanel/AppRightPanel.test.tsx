// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppRightPanel from './AppRightPanel.component'

describe('[AppRightPanel] component', () => {
  it('should render component', () => {
    const container = render(<AppRightPanel />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
