// ---| tests |---
import { render } from 'tests'

// ---| self |---
import MenuItem from './MenuItem.component'

describe('[MenuItem] component', () => {
  it('should render component', () => {
    const container = render(<MenuItem />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
