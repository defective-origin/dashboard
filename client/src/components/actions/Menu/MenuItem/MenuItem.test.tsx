// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import MenuItem from './MenuItem.component'

describe('[MenuItem] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<MenuItem />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
