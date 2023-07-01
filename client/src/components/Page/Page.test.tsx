// ---| tests |---
import { render } from 'tests'

// ---| self |---
import Page from './Page.component'

describe('[Page] component', () => {
  it('should render component', () => {
    const container = render(<Page />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
