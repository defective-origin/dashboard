// ---| tests |---
import { render } from 'tests'

// ---| self |---
import GuidePage from './GuidePage.component'

describe('[GuidePage] component', () => {
  it('should render component', () => {
    const container = render(<GuidePage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
