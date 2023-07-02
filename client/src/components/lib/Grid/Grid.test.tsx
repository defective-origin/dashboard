// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Grid from './Grid.component'

describe('[Grid] component', () => {
  it('should render component', () => {
    const container = render(<Grid />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
