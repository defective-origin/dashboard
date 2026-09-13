import DonationTable from './DonationTable.component'


describe('[DonationTable] component', () => {
  it('should render component', () => {
    const container = render(<DonationTable />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
