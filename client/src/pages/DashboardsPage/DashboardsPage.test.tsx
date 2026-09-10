import DashboardsPage from './DashboardsPage.component'

describe('[DashboardsPage] component', () => {
  it('should render component', () => {
    const container = render(<DashboardsPage />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
