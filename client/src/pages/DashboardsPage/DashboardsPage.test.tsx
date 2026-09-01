// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import DashboardsPage from './DashboardsPage.component'

describe('[DashboardsPage] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<DashboardsPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
