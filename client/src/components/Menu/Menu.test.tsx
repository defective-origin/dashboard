// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Menu from './Menu.component'

describe('[Menu] component', () => {
  it('should render component', () => {
    const container = render(<Menu />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
