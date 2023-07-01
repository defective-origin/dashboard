// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppMenuScreen from './AppMenuScreen.component'

describe('[AppMenuScreen] component', () => {
  it('should render component', () => {
    const container = render(<AppMenuScreen />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
