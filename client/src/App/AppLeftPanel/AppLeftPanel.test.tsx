// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppLeftPanel from './AppLeftPanel.component'

describe('[AppLeftPanel] component', () => {
  it('should render component', () => {
    const container = render(<AppLeftPanel />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
