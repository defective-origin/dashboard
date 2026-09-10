import DashboardPage from './DashboardPage.component'

describe('[DashboardPage] component', () => {
  it('should render component', () => {
    const container = render(<DashboardPage />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
