// ---| tests |---
import { render } from 'tests'

// ---| self |---
import UI from './UI.component'

describe('[UI] component', () => {
  it('should render component', () => {
    const container = render(<UI />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
