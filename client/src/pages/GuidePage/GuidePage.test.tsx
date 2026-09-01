// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import GuidePage from './GuidePage.component'

describe('[GuidePage] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<GuidePage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
