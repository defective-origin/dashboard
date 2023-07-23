// ---| tests |---
import { render } from 'tests'

// ---| self |---
import DashboardPage from './DashboardPage.component'

describe('[DashboardPage] component', () => {
  it('should render component', () => {
    const container = render(<DashboardPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
