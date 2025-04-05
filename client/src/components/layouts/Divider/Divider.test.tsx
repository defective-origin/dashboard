// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Divider from './Divider.component'

describe('[Divider] component', () => {
  it('should render component', () => {
    const container = render(<Divider />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
