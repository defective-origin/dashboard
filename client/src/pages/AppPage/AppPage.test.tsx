// ---| tests |---
import { render } from 'tests'

// ---| self |---
import AppPage from './AppPage.component'

describe('[AppPage] component', () => {
  it('should render component', () => {
    const container = render(<AppPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
