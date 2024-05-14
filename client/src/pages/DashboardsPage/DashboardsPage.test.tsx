// ---| tests |---
import { render } from 'tests'

// ---| self |---
import DashboardsPage from './DashboardsPage.component'

describe('[DashboardsPage] component', () => {
  it('should render component', () => {
    const container = render(<DashboardsPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
