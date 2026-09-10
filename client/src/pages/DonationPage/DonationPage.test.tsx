import DonationPage from './DonationPage.component'

describe('[DonationPage] component', () => {
  it('should render component', () => {
    const container = render(<DonationPage />, { launcher: true })

    expect(container.snapshot()).toMatchSnapshot()
  })
})
