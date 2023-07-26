// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Tooltip from './Tooltip.component'

describe('[Tooltip] component', () => {
  it('should render component', () => {
    const container = render(<Tooltip />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
