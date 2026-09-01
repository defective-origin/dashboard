// ---| tests |---
import { renderWithLauncher } from 'tests'

// ---| self |---
import DashboardPage from './DashboardPage.component'

describe('[DashboardPage] component', () => {
  it('should render component', () => {
    const container = renderWithLauncher(<DashboardPage />)

    expect(container.snapshot()).toMatchSnapshot()
  })
})
