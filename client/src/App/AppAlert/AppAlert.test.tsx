// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppAlert from './AppAlert.component'

describe('[AppAlert] component', () => {
  it('should render component', () => {
    const container = render(<AppAlert />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
