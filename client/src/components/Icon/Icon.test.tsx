// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Icon from './Icon.component'

describe('[Icon] component', () => {
  it('should render component', () => {
    const container = render(<Icon v='dark_mode' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
