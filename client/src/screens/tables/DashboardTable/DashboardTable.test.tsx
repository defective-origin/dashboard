import DashboardTable from './DashboardTable.component'


describe('[DashboardTable] component', () => {
  it('should render component', () => {
    const container = render(<DashboardTable />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
