// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Tooltip from './Tooltip.component'

describe('[Tooltip] component', () => {
  it('should render component', () => {
    const container = render(<Tooltip content='TEXT' />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
